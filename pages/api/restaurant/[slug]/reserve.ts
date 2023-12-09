import { PrismaClient } from '@prisma/client';
import { table } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAvailableTables } from '../../../../services/restaurant/findAvailableTables';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { slug, day, partySize, time } = req.query as {
      slug: string;
      day: string;
      partySize: string;
      time: string;
    };

    const {
      booker_email,
      booker_first_name,
      booker_last_name,
      booker_occasion,
      booker_phone,
      booker_request,
    } = req.body as {
      booker_email: string;
      booker_phone: string;
      booker_first_name: string;
      booker_last_name: string;
      booker_occasion?: string;
      booker_request?: string;
    };

    if (!slug || !time || !day || !partySize) {
      return res.status(400).json({ errorMessage: 'Invalid details' });
    }

    // validate
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        open_time: true,
        close_time: true,
        Table: true,
        id: true,
      },
    });

    if (!restaurant) {
      return res.status(404).json({ errorMessage: 'Invalid restaurant' });
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return res
        .status(404)
        .json({ errorMessage: 'Restaurant is not open at that time' });
    }

    // Determine table availability
    const searchTimesWithTables = await findAvailableTables({
      time,
      res,
      day,
      restaurant,
    });

    if (!searchTimesWithTables) {
      return res.status(400).json({ errorMessage: 'Invalid details' });
    }

    const searchedTime = searchTimesWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    });

    if (!searchedTime) {
      return res
        .status(400)
        .json({ errorMessage: 'No availability. Cannot book.' });
    }

    // count table based on partySize
    const tablesCount: { 2: number[]; 4: number[] } = {
      2: [],
      4: [],
    };

    searchedTime.tables.forEach((table) => {
      if (table.seats) {
        tablesCount[2].push(table.id);
      } else {
        tablesCount[4].push(table.id);
      }
    });

    // Determine the table to book
    const tableToBooks: number[] = [];
    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
      // check if the quantity of persons is greater or equal to 3
      if (seatsRemaining >= 3) {
        // check if exists, table that have 4 seats
        if (tablesCount[4].length) {
          tableToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        }
        // there are no table of 4 seats
        else {
          tableToBooks.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        }
      }
      // the quantity of persons is less or equal to 2
      else {
        // check if exists, table that have 2 seats
        if (tablesCount[2].length) {
          tableToBooks.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        }
        // there are no table of 2 seats
        else {
          tableToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email,
        booker_first_name,
        booker_last_name,
        booker_phone,
        booker_occasion,
        booker_request,
        restaurant_id: restaurant.id,
      },
    });

    const bookingsOnTablesData = tableToBooks.map((table_id) => {
      return {
        table_id,
        booking_id: booking.id,
      };
    });

    await prisma.bookingsOnTables.createMany({
      data: bookingsOnTablesData,
    });

    return res.status(200).json({ booking });
  } else {
    return res.status(400).json({ errorMessage: 'Method not allowed.' });
  }
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-12-07&time=17:30:00.000Z&partySize=4

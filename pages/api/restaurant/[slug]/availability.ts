import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { times } from '../../../../data';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    time: string;
    day: string;
    partySize: string;
  };

  if (!slug || !time || !day || !partySize) {
    return res.status(400).json({ errorMessage: 'Invalid details' });
  }

  // find all search times
  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({ errorMessage: 'Invalid time' });
  }

  // Fetch all Bookings
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  // compress bookings
  const bookingTableObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingTableObj[booking.booking_time.toISOString()] = booking.tables.reduce(
      (obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      },
      {}
    );
  });

  // Fetch restaurant tables
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      Table: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({ errorMessage: 'Invalid details' });
  }

  const tables = restaurant.Table;

  // reformatting the search times
  const searchTimesWithTables = searchTimes.map((st) => {
    return {
      date: new Date(`${day}T${st}`),
      time: st,
      tables,
    };
  });

  // Filter out tables if they are already booked
  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTableObj[t.date.toISOString()]) {
        if (bookingTableObj[t.date.toISOString()][table.id]) {
          return false;
        }
      }
      return true;
    });
  });

  // Determine the availability
  const availabilities = searchTimesWithTables
    .map((st) => {
      const sumSeats = st.tables.reduce((sum, table) => sum + table.seats, 0);
      return {
        time: st.time,
        available: sumSeats >= +partySize,
      };
    })
    .filter((available) => {
      const timeIsAfterOpeningHours =
        new Date(`${day}T${available.time}`) >=
        new Date(`${day}&${restaurant.open_time}`);
      const timeIsBeforeClosingHours =
        new Date(`${day}T${available.time}`) <=
        new Date(`${day}&${restaurant.close_time}`);

      return timeIsAfterOpeningHours && timeIsBeforeClosingHours;
    });

  return res.status(200).json({ availabilities });
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-12-07&time=17:30:00.000Z&partySize=4

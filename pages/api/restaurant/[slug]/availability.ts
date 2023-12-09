import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { findAvailableTables } from '../../../../services/restaurant/findAvailableTables';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      time: string;
      day: string;
      partySize: string;
    };

    if (!slug || !time || !day || !partySize) {
      return res.status(400).json({ errorMessage: 'Invalid details' });
    }

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

    const searchTimesWithTables = await findAvailableTables({
      time,
      res,
      day,
      restaurant,
    });

    if (!searchTimesWithTables) {
      return res.status(400).json({ errorMessage: 'Invalid details' });
    }

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

    return res.status(200).json(availabilities);
  }
  return res.status(400).json({ errorMessage: 'Method not allowed.' });
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-12-07&time=17:30:00.000Z&partySize=4

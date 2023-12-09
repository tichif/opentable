import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { times } from '../../data';

interface Data {
  time: string;
  day: string;
  res: NextApiResponse;
  restaurant: {
    open_time: string;
    close_time: string;
    Table: {
      id: number;
      seats: number;
      restaurant_id: number;
      created_at: Date;
      updated_at: Date;
    }[];
  };
}

const prisma = new PrismaClient();

export const findAvailableTables = async ({
  time,
  day,
  res,
  restaurant,
}: Data) => {
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

  return searchTimesWithTables;
};

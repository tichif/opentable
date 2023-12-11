import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

interface Values {
  slug: string;
  time: string;
  day: string;
  partySize: number;
  inputs: Reservation;
  setDidBook: Dispatch<SetStateAction<boolean>>;
}

interface Reservation {
  booker_first_name: string;
  booker_last_name: string;
  booker_phone: string;
  booker_email: string;
  booker_request: string;
  booker_occasion: string;
}

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    day,
    time,
    partySize,
    inputs,
    setDidBook,
  }: Values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/restaurant/${slug}/reserve?day=${day}&time=${time}&partySize=${partySize}`,
        inputs
      );
      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setDidBook(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { createReservation, loading, error };
}

import { useState } from 'react';
import axios from 'axios';

interface Values {
  slug: string;
  time: string;
  day: string;
  partySize: number;
}

interface Response {
  data: { time: string; available: boolean }[];
}

export default function useAvailability() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    day,
    time,
    partySize,
  }: Values) => {
    setLoading(true);
    try {
      const response = await axios.get<{}, Response>(
        `/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`
      );
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { fetchAvailabilities, loading, error, data };
}

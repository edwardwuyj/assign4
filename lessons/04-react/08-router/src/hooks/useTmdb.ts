import { useApiKey } from '@/hooks/useApiKey';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

export function useTmdb<T>(url: string, params: Record<string, unknown>) {
  const { apiKey } = useApiKey();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const paramsString = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get<T>(url, {
          params: {
            api_key: apiKey,
            ...params,
          },
          signal: controller.signal,
        });

        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
          return;
        }
        console.error(error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();

    return () => controller.abort();
  }, [apiKey, url, paramsString]);

  return { data, error };
}

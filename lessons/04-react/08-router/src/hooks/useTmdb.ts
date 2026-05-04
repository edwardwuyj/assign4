import { useApiKey } from '@/hooks/useApiKey';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function useTmdb<T>(url: string, params: Record<string, unknown>) {
  const { apiKey } = useApiKey();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: apiKey,
            ...params,
          },
          signal: controller.signal,
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [apiKey, url, params]);

  return { data };
}

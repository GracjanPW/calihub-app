'use client';
import { getLabels } from '@/actions/labels/get-labels';
import { Label } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useGetLabels = () => {
  const [data, setData] = useState<Label[]>([]);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    setStatus('loading');
    const fetchData = async () => {
      const data = await getLabels();
      console.log(data);
      setData(data);
      setStatus('success');
    };
    fetchData();
  }, []);

  return {
    data,
    status,
  };
};

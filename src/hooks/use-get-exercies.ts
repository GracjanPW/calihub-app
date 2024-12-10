'use client';
import { getExercises } from '@/actions/exercises/get-exercises';
import { Exercise } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useGetExercises = () => {
  const [data, setData] = useState<Partial<Exercise>[]>([]);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    setStatus('loading');
    const fetchData = async () => {
      const data = await getExercises();
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

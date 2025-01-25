import { useState, useEffect } from 'react';
import { fetchMenu } from '@/lib/api';

export const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        setLoading(true);
        const data = await fetchMenu();
        setMenu(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getMenu();
  }, []);

  return { menu, loading, error };
}; 
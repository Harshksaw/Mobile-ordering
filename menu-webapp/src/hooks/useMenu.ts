import { useState, useEffect } from 'react';

export const useMenu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Implement caching strategy
    const fetchMenu = async () => {
      const cached = await caches.match('/api/menu');
      if (cached) {
        const data = await cached.json();
        setMenu(data);
        return;
      }
      // Fetch and cache
    };
    fetchMenu();
  }, []);

  return menu;
}; 
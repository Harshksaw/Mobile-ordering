import { MenuItem as MenuItemType } from '@/types';
import MenuItem from './MenuItem';
import { menuItems } from '@/data/menuItems';

interface MenuGridProps {
  onAddToCart: (item: MenuItemType) => void;
}

export const MenuGrid = ({ onAddToCart }: MenuGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}; 
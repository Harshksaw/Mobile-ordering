import { memo } from 'react';
import { MenuItem as MenuItemType } from '@/types';
import Image from 'next/image';

interface Props {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

const MenuItem = memo(({ item, onAddToCart }: Props) => {
  return (
    <div className="bg-gray-800  
    mt-16
    mb-4
    h-72 w-full flex flex-col justify-between
    items-center
    rounded-lg shadow-lg overflow-hidden border border-gray-700
     hover:border-yellow-500 transition-all duration-300

     ">
      <div className="p-4">
        {item.image && (
          <Image
            src={item.image}
            width={150}
            height={100}
            alt={item.name}
          />
        )}

        <div className='flex flex-col justify-center items-center'>

        <h3 className="text-xl font-semibold text-yellow-400 mb-2">{item.name}</h3>
        {/* <p className="text-gray-400 mb-2">{item.description}</p> */}
        <p className="text-2xl font-bold text-yellow-400 mb-4">{item.price}</p>
        </div>
        <button 
          onClick={() => onAddToCart(item)}
          className="w-full bg-yellow-500 text-gray-900 py-2 px-4 
          rounded-md hover:bg-yellow-400 transition-colors font-bold"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
});

MenuItem.displayName = 'MenuItem';
export default MenuItem;
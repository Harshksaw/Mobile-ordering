import { memo } from 'react';
import { MenuItem as MenuItemType } from '@/types';
import Image from 'next/image';

interface Props {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

const MenuItem = memo(({ item, onAddToCart }: Props) => {
  return (
    <div className="bg-gray-800 relative
      mb-4
      h-72 w-full flex flex-col justify-between
      items-center


      rounded-lg shadow-lg overflow-hidden border border-gray-700
      hover:border-yellow-500 transition-all duration-300 ">
      
      {/* Price Circle */}
      <div className="absolute -top-3 -right-3 w-20 h-16 bg-orange-400 
        rounded-full flex items-center justify-center transform rotate-12
        shadow-lg z-10">
        <span className="text-gray-900 font-bold text-2xl transform -rotate-12">
        ₹{item.price}
        </span>
      </div>

      <div className="p-4 w-full">
        {item.image && (
          <div className="flex justify-center">
            <Image
              src={item.image}
              width={150}
              height={100}
              alt={item.name}
            />
          </div>
        )}

        <div className='flex flex-col justify-center items-center mt-2'>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2 text-wrap  text-center pr-2">
            {item.name}
          </h3>
        </div>

        <button 
          onClick={() => onAddToCart(item)}
          className="w-full bg-yellow-400 text-gray-900 py-2 px-4 
            rounded-md hover:bg-yellow-400 transition-colors font-bold
            mt-auto"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
});

MenuItem.displayName = 'MenuItem';
export default MenuItem;
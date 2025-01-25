import { FaShoppingCart } from 'react-icons/fa';

interface HeaderProps {
  itemCount: number;
  onCartClick: () => void;
}

export const Header = ({ itemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-yellow-400 text-xl font-bold">Burger Paradise</div>
        <button 
          onClick={onCartClick}
          className="relative p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <FaShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}; 
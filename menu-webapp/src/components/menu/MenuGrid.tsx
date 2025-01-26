import { MenuItem as MenuItemType } from "@/types";
import MenuItem from "./MenuItem";
import { useMenu } from "@/hooks/useMenu";
import { MenuSkeleton } from "./MenuSkeleton";

interface MenuGridProps {
  onAddToCart: (item: MenuItemType) => void;
}

export const MenuGrid = ({ onAddToCart }: MenuGridProps) => {
  const { menu, loading, error } = useMenu();

  if (loading) return <MenuSkeleton />;
  if (error) return <div>Error loading menu</div>;
  console.log(menu);
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-40 z-10">
      {/* @ts-expect-error: Suspense component requires a fallback */}
      {menu?.items.map((item: MenuItemType) => (
        <MenuItem key={item._id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

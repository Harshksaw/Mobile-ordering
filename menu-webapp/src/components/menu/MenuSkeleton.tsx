export const MenuSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((n) => (
      <div key={n} className="animate-pulse bg-gray-600 rounded-lg h-64 border-yellow-300 border-2" />
    ))}
  </div>
); 
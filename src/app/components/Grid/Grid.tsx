export const Grid = () => {
  return (
    <div className="fixed inset-0 grid grid-cols-3 auto-rows-min md:grid-cols-6 lg:grid-cols-9 px-8 gap-x-4 lg:gap-x-6 min-h-screen">
      {[...Array(9)].map((_, i) => (
        <div className="bg-black/5 h-screen" />
      ))}
    </div>
  );
};

export const GRID_STYLE =
  "grid auto-rows-min grid-cols-3 md:grid-cols-6 lg:grid-cols-9 px-8 gap-x-4 lg:gap-x-6 min-h-screen";

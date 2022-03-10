const CategoryCard = ({ title, catList }) => {
  return (
    <div>
      <h2 className="text-gray-400 text-md mb-1">{title}</h2>
      <div className="grid gap-2">
        {catList?.map((cat) => {
          return (
            <div
              key={cat?.name}
              // onClick={() => setEditCategoryModal(cat)}
              className={`bg-gray-50 border rounded-full py-2 px-4 text-sm flex items-center  space-x-2 text-gray-600 cursor-pointer`}
            >
              {cat?.icon && (
                <span className="material-icons-round text-gray-500">
                  {cat?.icon}
                </span>
              )}
              <span>{cat?.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCard;

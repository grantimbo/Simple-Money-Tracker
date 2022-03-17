import InputLabel from "../InputLabel";

const CategoryCard = ({ title, catList, setEditCategoryModal }) => {
  return (
    <div>
      <InputLabel text={title} />
      <div className="grid gap-1 md:gap-2">
        {catList?.map((cat) => {
          return (
            <div
              key={cat?.name}
              onClick={() => setEditCategoryModal(cat)}
              className={`bg-gray-50 border rounded-full py-1 px-3 text-xs flex items-center space-x-2 text-gray-600 cursor-pointer md:py-2 md:px-4 md:text-sm`}
            >
              {cat?.icon && (
                <span className="material-icons-round text-gray-500 text-lg md:text-xl">
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

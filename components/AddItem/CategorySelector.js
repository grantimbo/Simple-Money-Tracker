import { Context } from "../../support/globalState";
import { useContext } from "react";

const CategorySelector = ({ method, category, setCategory }) => {
  const ctx = useContext(Context);

  const expense = ctx?.profile?.categories?.filter((e) => e.method == 0);
  const income = ctx?.profile?.categories?.filter((e) => e.method == 1);

  return (
    <div className="grid grid-cols-2 gap-1 mb-6 md:grid-cols-3 md:gap-2">
      {method === 0
        ? expense?.map((cat) => {
            return (
              <div
                onClick={() => {
                  setCategory({
                    name: cat?.name,
                    icon: cat?.icon,
                  });
                }}
                key={cat?.name}
                className={`${
                  cat?.name == category?.name
                    ? "bg-lime-200 border-lime-500 text-lime-600 "
                    : "bg-gray-50 text-gray-500"
                }  border-2 rounded-full px-4 py-2 cursor-pointer flex items-center justify-left space-x-2 text-xs md:text-base`}
              >
                {cat?.icon && (
                  <span className="material-icons-round text-sm md:text-xl">
                    {cat?.icon}
                  </span>
                )}
                <span>{cat?.name}</span>
              </div>
            );
          })
        : income?.map((cat) => {
            return (
              <div
                onClick={() => {
                  setCategory({
                    name: cat?.name,
                    icon: cat?.icon,
                  });
                }}
                key={cat?.name}
                className={`${
                  cat?.name == category?.name
                    ? "bg-lime-200 border-lime-500 text-lime-600 "
                    : "bg-gray-50 text-gray-500"
                }  border-2 rounded-full px-4 py-2 cursor-pointer flex items-center justify-center space-x-2 text-sm`}
              >
                {cat?.icon && (
                  <span className="material-icons-round">{cat?.icon}</span>
                )}
                <span>{cat?.name}</span>
              </div>
            );
          })}
    </div>
  );
};

export default CategorySelector;

import { categoryIcons } from "../../support/categoryIcons";

const IconSelector = ({ icon, setIcon }) => {
  return (
    <div className="max-h-72 overflow-y-auto  mb-6">
      <div className="grid gap-1 grid-cols-6">
        {categoryIcons?.map((e) => (
          <div
            key={e}
            onClick={(e) => setIcon(e?.target?.dataset?.value)}
            data-value={e}
            className={`${
              icon == e
                ? "bg-lime-500 text-lime-100 border-lime-400 "
                : "bg-gray-100 text-gray-400"
            } flex items-center justify-center border px-4 py-2 rounded-md cursor-pointer`}
          >
            <span className="material-icons-round " data-value={e}>
              {e}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSelector;

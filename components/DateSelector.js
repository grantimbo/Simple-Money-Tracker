import { useState, useContext, useEffect } from "react";
import { Context } from "../support/globalState";

const DateSelector = () => {
  const ctx = useContext(Context);
  const [assignDate, setAssignDate] = useState(null);

  useEffect(() => {
    const d = new Date();
    console.log(`${d.getMonth() + 1}_${d.getFullYear()}`);
  }, []);

  return (
    <div className="relative">
      <span className="absolute top-0 bottom-0 right-0 w-8 flex items-center ">
        <span className="material-icons-round text-gray-300">
          keyboard_arrow_down
        </span>
      </span>
      {/* <select
        onChange={(e) => setAssignDate(e?.target?.value)}
        required
        className="bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-gray-400 text hover:bg-opacity-80  px-5 py-2 pr-9 rounded-full appearance-none w-full"
      >
        {propertyNames?.map((cur) => {
          return (
            <option key={cur} value={cur}>
              {cur}
            </option>
          );
        })}
      </select> */}
    </div>
  );
};

export default DateSelector;

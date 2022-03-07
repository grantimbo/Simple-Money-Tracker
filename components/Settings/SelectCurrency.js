import { currencies } from "../../support/currencies";
import { useEffect, useState } from "react";

const SelectCurrency = (props) => {
  const { color, currency, setCurrency, additionalClasses } = props;

  const [tae, setTae] = useState("USD");

  const assignCurrency = (cc) => {
    const tmpCur = currencies.find((c) => c.cc === cc);
    setCurrency(tmpCur?.symbol);
    setTae(tmpCur?.cc);
  };

  useEffect(() => {
    const tmpCur = currencies.find((c) => c.symbol === currency);
    setTae(tmpCur?.cc);
  }, []);

  return (
    <div className="relative mb-4">
      <span className="absolute top-0 bottom-0 right-0 w-8 flex items-center ">
        <span className="material-icons-round text-gray-300">
          keyboard_arrow_down
        </span>
      </span>
      <select
        onChange={(e) => assignCurrency(e?.target?.value)}
        required
        value={tae}
        className={`${
          color == "gray"
            ? "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-gray-400"
            : "bg-lime-100 border-2 border-lime-500 text-teal-900 focus:outline-lime-400"
        } text hover:bg-opacity-80  px-5 py-2 rounded-full appearance-none ${additionalClasses}`}
      >
        {currencies?.map((cur) => {
          return (
            <option key={cur?.cc} value={cur?.cc}>
              {cur?.name} ({cur?.symbol})
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCurrency;

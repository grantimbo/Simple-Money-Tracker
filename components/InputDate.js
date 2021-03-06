import { parseDate } from "../support/parseDate";

const InputDate = (props) => {
  const { placeholder, value, setValue, additionalClasses, color } = props;

  const d = new Date();
  const y = d.getFullYear();
  const m = ("0" + (d.getMonth() + 1)).slice(-2);
  const dy = new Date(y, d.getMonth(), 0).getDate();

  const min = `${y}-${m}-01T00:00`;
  const max = `${y}-${m}-${dy}T00:00`;

  return (
    <input
      type="datetime-local"
      value={parseDate(value)}
      onChange={(e) => setValue(e?.target?.value)}
      min={min}
      max={max}
      className={`${
        color == "gray"
          ? "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-gray-400"
          : "bg-lime-100 border-2 border-lime-500 text-teal-900 focus:outline-lime-400"
      } text-sm hover:bg-opacity-80 px-6 py-2 w-full rounded-full md:text-lg  ${additionalClasses}`}
      placeholder={placeholder}
    ></input>
  );
};

export default InputDate;

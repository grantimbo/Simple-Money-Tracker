const Input = (props) => {
  const { type, placeholder, value, setValue, additionalClasses, color } =
    props;
  // const [value, setValue] = useState(value);

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e?.target?.value)}
      className={`${
        color == "gray"
          ? "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-gray-400"
          : "bg-lime-100 border-2 border-lime-500 text-teal-900 focus:outline-lime-400"
      } text hover:bg-opacity-80  px-5 py-2 rounded-full  ${additionalClasses}`}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;

const Input = (props) => {
  const { type, placeholder, setValue, additionalClasses } = props;
  // const [value, setValue] = useState(value);
  return (
    <input
      type={type}
      onChange={(e) => setValue(e?.target?.value)}
      className={`bg-lime-100 border-2 border-lime-500 text hover:bg-opacity-80 text-teal-900 px-5 py-2 rounded-full focus:outline-lime-400 ${additionalClasses}`}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;

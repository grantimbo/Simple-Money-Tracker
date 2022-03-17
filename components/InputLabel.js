const InputLabel = ({ text, additionalClasses }) => {
  return (
    <p
      className={`text-gray-400 text-sm mb-1 md:text-base ${additionalClasses}`}
    >
      {text}
    </p>
  );
};

export default InputLabel;

const SelectWrapper = ({ children, additionalClasses }) => {
  return (
    <div className={`relative ${additionalClasses}`}>
      <span className="absolute top-0 bottom-0 right-0 w-8 flex items-center ">
        <span className="material-icons-round text-gray-300">
          keyboard_arrow_down
        </span>
      </span>
      {children}
    </div>
  );
};

export default SelectWrapper;

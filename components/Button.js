const Button = (props) => {
  const { onClick, text, icon, additionalClasses } = props;
  return (
    <button
      onClick={onClick}
      className={`bg-lime-500 hover:bg-opacity-80 text-white text-md px-5 py-2 space-x-2 cursor-pointer rounded-full text-center justify-center inline-flex items-center focus:outline-lime-700 ${additionalClasses}`}
    >
      {icon && <span className="material-icons-round">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;

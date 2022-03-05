const Button = (props) => {
  const { onClick, text, icon, additionalClasses, color } = props;

  return (
    <button
      onClick={onClick}
      className={`${
        color == "gray"
          ? "text-slate-500 bg-slate-300 focus:outline-slate-700"
          : "text-white bg-lime-500 focus:outline-lime-700"
      } hover:bg-opacity-80 px-5 py-2 space-x-2 cursor-pointer rounded-full text-center text-lg justify-center inline-flex items-center ${additionalClasses}`}
    >
      {icon && <span className="material-icons-round">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;

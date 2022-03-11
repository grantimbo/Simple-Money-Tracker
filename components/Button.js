const Button = (props) => {
  const { onClick, text, icon, additionalClasses, color } = props;

  const colors = {
    green: "text-white bg-lime-500 focus:outline-lime-700",
    gray: "text-slate-500 bg-slate-300 focus:outline-slate-700",
    red: "text-white bg-red-500 focus:outline-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={` hover:bg-opacity-80 px-5 py-2 space-x-2 cursor-pointer rounded-full text-center text-lg justify-center inline-flex items-center red-center ${
        colors[color] || colors["green"]
      } ${additionalClasses}`}
    >
      {icon && <span className="material-icons-round">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;

import Link from "next/link";

const ButtonLink = (props) => {
  const { href, text, icon, color, additionalClasses, size } = props;

  const colors = {
    green: "text-white bg-lime-500 focus:outline-lime-700",
    gray: "text-slate-500 bg-slate-300 focus:outline-slate-700",
    red: "text-white bg-red-500 focus:outline-red-700",
  };

  const sizes = {
    sm: "px-5 py-2 text-md",
    md: "px-5 py-2 text-lg",
    lg: "px-10 py-3 text-xl",
    xl: "px-10 py-3 text-2xl",
  };

  return (
    <Link href={href}>
      <a
        className={` hover:bg-opacity-80  space-x-2 cursor-pointer rounded-full text-center  justify-center inline-flex items-center ${
          colors[color] || colors["green"]
        } ${sizes[size] || sizes["md"]} ${additionalClasses}`}
      >
        {icon && <span className="material-icons-round">{icon}</span>}
        <span>{text}</span>
      </a>
    </Link>
  );
};

export default ButtonLink;

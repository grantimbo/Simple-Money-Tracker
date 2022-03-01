import Link from "next/link";

const ButtonLink = (props) => {
  const { href, text, icon, color } = props;
  return (
    <Link href={href}>
      <a
        className={` hover:bg-opacity-80 px-5 py-2 space-x-2 cursor-pointer rounded-full text-center justify-center inline-flex items-center  ${
          color == "gray"
            ? "text-slate-500 bg-slate-300 focus:outline-slate-700"
            : "text-white bg-lime-500 focus:outline-lime-700"
        }`}
      >
        {icon && <span className="material-icons-round">{icon}</span>}
        <span>{text}</span>
      </a>
    </Link>
  );
};

export default ButtonLink;

const NotificationCard = ({ text, type = "success" }) => {
  const types = {
    success: "bg-lime-500",
    error: "bg-red-600",
    info: "bg-orange-600",
  };
  const icon = {
    success: "done",
    error: "error_outline",
    info: "info_outline",
  };

  return (
    <div
      className={`${types[type]} text-white px-3 py-2 rounded-lg space-x-2 flex items-center fade-in text-sm md:text-base md:px-6 md:py-4`}
    >
      <span className="material-icons-round text-3xl">
        {icon[type] || icon["success"]}
      </span>
      <span>{text}</span>
    </div>
  );
};

export default NotificationCard;

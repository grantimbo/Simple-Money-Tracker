import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.querySelector("body").setAttribute("style", "overflow:hidden");
    return () => {
      document.querySelector("body").removeAttribute("style");
    };
  }, []);

  return (
    <div className="fixed -top-2 left-0 bottom-0 right-0 p-10 fade-in">
      <div className="bg-gray-50 rounded-lg p-4 max-w-lg w-full mx-auto mt-20 relative z-10">
        <div
          onClick={onClose}
          className="absolute right-4 top-2 cursor-pointer "
        >
          <span className="material-icons-round text-4xl">highlight_off</span>
        </div>

        {children}
      </div>

      <div
        onClick={onClose}
        className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30"
      ></div>
    </div>
  );
};

export default Modal;

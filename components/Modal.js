import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.querySelector("body").setAttribute("style", "overflow:hidden");
    return () => {
      document.querySelector("body").removeAttribute("style");
    };
  }, []);

  return (
    <div className="fixed -top-2 left-0 bottom-0 right-0 p-4 fade-in z-50 md:p-10 overflow-x-auto">
      <div className="bg-gray-50 rounded-lg p-4 max-w-lg w-full mx-auto mt-4 relative z-10 shadow-sm md:mt-20 ">
        <div
          onClick={onClose}
          className="absolute right-3 top-2 cursor-pointer "
        >
          <span className="material-icons-round text-4xl">highlight_off</span>
        </div>

        {children}
      </div>

      <div
        onClick={onClose}
        className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30"
      />
    </div>
  );
};

export default Modal;

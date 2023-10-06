import React, { createContext, useContext, useRef, useState } from "react";

const ModalContext = createContext(null);

const Modal = ({ children }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  function handleBackdropClose(e) {
    if (e.target != ref.current) return;
    setShow(false);
  }
  return (
    <>
      <button onClick={() => setShow(true)}>Open</button>
      <ModalContext.Provider value={{ setShow }}>
        <dialog
          ref={ref}
          className={`${
            show ? "flex" : "hidden"
          } fixed inset-0 bg-white/50 backdrop-blur h-screen w-full z-50 flex-col justify-center`}
          onClick={handleBackdropClose}
        >
          <div className="w-[45rem] bg-white rounded-md p-4 mx-auto ">
            {children}
          </div>
        </dialog>
      </ModalContext.Provider>
    </>
  );
};

Modal.CloseBtn = CloseBtn;
Modal.Header = Header;

export default Modal;

function CloseBtn({ children }) {
  const { setShow } = useContext(ModalContext);
  return (
    <span className="flex gap-2">
      <button
        className="p-2 border border-red-400"
        onClick={() => setShow(false)}
      >
        {children}
      </button>
    </span>
  );
}
function Header({ children }) {
  return <h1 className="text-4xl font-semibold">{children}</h1>;
}

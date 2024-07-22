import { ReactNode, useEffect } from 'react';

export type PropsType = {
  isOpen?: boolean;
  className?: string;
  children?: ReactNode;
};

const Modal = ({ isOpen, className, children }: PropsType) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      className={`justify-center flex overflow-x-hidden lg:overflow-y-auto fixed inset-0 z-50 lg:my-5 outline-none focus:outline-none tracking-wide ${
        className ?? ''
      }`}
    >
      <div className="relative w-auto mx-auto">
        <div className="border-0 lg:rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {children}
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 -z-10 bg-black"></div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;

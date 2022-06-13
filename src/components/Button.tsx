import React, { ReactNode } from 'react';

const Button: React.FC<{
  type: any;
  onClick?: () => void;
  id: string;
  className?: string;
  children: ReactNode;
}> = (props) => {
  return (
    <button
      type={props.type}
      className={`mt-6 flex items-center justify-center pt-3 pb-3 outline-none border-none bg-[#0FBA68] rounded-lg uppercase text-white ${props.className}`}
      onClick={props.onClick}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;

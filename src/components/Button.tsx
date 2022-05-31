import React from 'react';

const Button: React.FunctionComponent<{
  type: any;
  onClick?: () => {};
  id: string;
  children: any;
}> = (props) => {
  return (
    <button
      type={props.type}
      className="mt-6 w-full flex items-center justify-center pt-3 pb-3 outline-none border-none bg-[#0FBA68] rounded-lg uppercase text-white"
      onClick={props.onClick}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;

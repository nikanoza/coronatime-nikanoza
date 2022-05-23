import React from 'react';

const Button: React.FunctionComponent<{
  type: any;
  className: string;
  onClick: () => {};
  id: string;
  children: any;
}> = (props) => {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;

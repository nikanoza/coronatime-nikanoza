import React from 'react';

interface propsObj {
  label: string;
  className: string;
  type: string;
  placeholder: string;
  register: any;
  validations: object;
  onChange?: () => {};
}

const Input: React.FunctionComponent<propsObj> = (props) => {
  return (
    <div className={props.className}>
      <div className="font-bold capitalize">{props.label}</div>
      <input
        type={props.type}
        className="w-1/2 pt-3 pb-3 pl-3 pr-3 mt-2 border-2 rounded-lg focus:border-[#2029F3] outline-none"
        placeholder={props.placeholder}
        {...props.register(props.label, {
          ...props.validations,
          onChange: props.onChange,
        })}
      />
    </div>
  );
};

export default Input;

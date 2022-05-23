import React from 'react';

interface propsObj {
  label: string;
  className: string;
  inputClass?: string;
  text: string;
  type: string;
  placeholder?: string;
  register: any;
  validations: object;
  onChange?: () => {};
}

const Input: React.FC<propsObj> = (props) => {
  return (
    <div className={props.className}>
      <label className="font-bold capitalize" htmlFor={props.label}>
        {props.text}
      </label>
      <input
        type={props.type}
        className={props.inputClass}
        placeholder={props.placeholder}
        {...props.register(props.label, {
          ...props.validations,
          onChange: props.onChange,
        })}
        id={props.label}
      />
    </div>
  );
};

export default Input;

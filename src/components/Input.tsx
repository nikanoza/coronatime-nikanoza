import React from 'react';
import { Correct } from 'assets';
import { UseFormRegister } from 'react-hook-form';

const Input: React.FC<{
  label: string;
  className: string;
  inputClass?: string;
  text: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  validations: object;
  correct?: boolean;
  onChange?: () => void;
  iconClass?: string;
}> = (props) => {
  return (
    <div className={props.className}>
      <label className="font-bold capitalize" htmlFor={props.label}>
        {props.text}
      </label>
      <div className="flex items-center justify-start">
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
        {props.correct && (
          <img className={props.iconClass} src={Correct} alt="" />
        )}
      </div>
    </div>
  );
};

export default Input;

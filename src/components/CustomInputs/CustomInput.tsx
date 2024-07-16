import React, { InputHTMLAttributes } from 'react';

interface Props<T extends object> extends InputHTMLAttributes<HTMLInputElement> {
  inputName: keyof T;
  placeholder: string;
}

export function CustomInput<T extends object>(props: Props<T>) {
  const { inputName, placeholder, ...others } = props;
  return (
    <input 
      name={inputName as string} 
      placeholder={placeholder} 
      {...others} 
      className="custom-input" 
    />
  );
}

export default CustomInput;

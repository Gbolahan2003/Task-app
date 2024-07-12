import React, { HtmlHTMLAttributes, InputHTMLAttributes } from 'react'


interface props <T extends object> extends HtmlHTMLAttributes<HTMLInputElement|HTMLTextAreaElement>{
    inputName:keyof T,
    placeholder: string
}
export function CustomInput<T extends object> (props:props<T>){
    const {inputName,placeholder, ...others}= props
  return (
    <>
    <input name={inputName as string} placeholder={placeholder} className='custom-input'/>
    </>
  )
}

export default CustomInput
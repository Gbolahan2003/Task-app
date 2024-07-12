interface Props<T extends object> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    inputName: keyof T;
    placeholder:string
}

export function TextArea<T extends object>(props: Props<T>) {
    const { inputName, placeholder,...others } = props;

    return (
        <textarea rows={3} {...others} placeholder={placeholder} name={inputName as string} className="custom-input textarea" />
    );
}
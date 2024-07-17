interface Props {
    isChecked: boolean;
    onChecked: VoidFunction;
    disabled:boolean
}

export function Checkbox(props: Props) {
    const { isChecked, onChecked, disabled=false } = props;

    return (
        <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" disabled={disabled} checked={isChecked} onChange={onChecked} onClick={(e) => e.stopPropagation()} />
            </label>
        </div>
    );
}
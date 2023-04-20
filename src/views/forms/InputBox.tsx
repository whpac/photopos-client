import './InputBox.scss';

interface InputBoxProps {
    type?: string;
    value?: string;
    id?: string;
    disabled?: boolean;
    onChange?: (newValue: string) => void;
};

function InputBox({ type, value, id, disabled, onChange }: InputBoxProps = {}) {
    type = type ?? 'text';
    return (
        <input
            className="input-box"
            type={type}
            value={value}
            id={id}
            disabled={disabled}
            onInput={(e) => onChange?.((e.target as HTMLInputElement).value)} />
    );
}

export default InputBox;
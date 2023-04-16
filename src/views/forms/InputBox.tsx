import './InputBox.scss';

interface InputBoxProps {
    type?: string;
    value?: string;
    id?: string;
    onChange?: (newValue: string) => void;
};

function InputBox({ type, value, id, onChange }: InputBoxProps = {}) {
    type = type ?? 'text';
    return (
        <input
            className="input-box"
            type={type}
            value={value}
            id={id}
            onInput={(e) => onChange?.((e.target as HTMLInputElement).value)} />
    );
}

export default InputBox;
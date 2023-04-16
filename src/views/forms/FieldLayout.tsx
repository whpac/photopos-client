import './FieldLayout.scss';

interface FieldLayoutProps {
    label: string;
    inputId?: string;
    children: React.ReactNode;
};

function FieldLayout({ label, inputId, children }: FieldLayoutProps) {
    return (
        <div className="field-layout">
            <label className="field-layout--label" htmlFor={inputId}>{label}</label>
            <div className="field-layout--input">{children}</div>
        </div>
    );
}

export default FieldLayout;
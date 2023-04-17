import './FormParagraph.scss';

interface FormParagraphProps {
    children: React.ReactNode;
};

function FormParagraph({ children }: FormParagraphProps) {
    return (
        <p className="form-paragraph">{children}</p>
    );
}

export default FormParagraph;
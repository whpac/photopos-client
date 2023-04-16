import './Button.scss';

interface ButtonProps {
    children: React.ReactNode;
    title?: string;
    isPrimary?: boolean;
    onClick?: () => void;
};

function Button({ children, title, isPrimary, onClick }: ButtonProps) {
    let classes = 'button';
    if (isPrimary) {
        classes += ' button__primary';
    }

    return (
        <button
            className={classes}
            type="button"
            aria-label={title}
            title={title}
            onClick={onClick}>
                {children}
        </button>
    );
}

export default Button;
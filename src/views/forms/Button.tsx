import './Button.scss';

interface ButtonProps {
    children: React.ReactNode;
    title?: string;
    isPrimary?: boolean;
    isLink?: boolean;
    isSubmit?: boolean;
    onClick?: () => void;
};

function Button({ children, title, isPrimary, isLink, isSubmit, onClick }: ButtonProps) {
    let classes = ['button'];
    if(isPrimary) {
        classes.push('button__primary');
    }
    if(isLink) {
        classes.push('button__link');
    } else {
        classes.push('button__default');
    }

    return (
        <button
            className={classes.join(' ')}
            type={isSubmit ? 'submit' : 'button'}
            aria-label={title}
            title={title}
            onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
import './Button.scss';

interface ButtonProps {
    children: React.ReactNode;
    title?: string;
    isPrimary?: boolean;
    isLink?: boolean;
    isSubmit?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
};

function Button({ children, title, isPrimary, isLink, isSubmit, disabled, onClick, href }: ButtonProps) {
    let classes = ['button'];
    if(isPrimary) {
        classes.push('button__primary');
    }
    if(isLink) {
        classes.push('button__link');
    } else {
        classes.push('button__default');
    }

    if(href !== undefined) {
        return (
            <a
                className={classes.join(' ')}
                title={title}
                target="_blank"
                href={href}>
                {children}
            </a>
        );
    }

    return (
        <button
            className={classes.join(' ')}
            type={isSubmit ? 'submit' : 'button'}
            aria-label={title}
            title={title}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
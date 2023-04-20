import './DialogButtons.scss';

interface DialogButtonsProps {
    children: React.ReactNode;
};

function DialogButtons({ children }: DialogButtonsProps) {
    return (
        <div className="dialog-buttons">
            {children}
        </div>
    );
}

export default DialogButtons;
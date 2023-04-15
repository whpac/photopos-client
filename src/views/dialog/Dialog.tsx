import './Dialog.scss';
import DialogController from './DialogController';

interface DialogProps {
    dialogId: string;
    children: React.ReactNode;
};

function Dialog({ dialogId, children }: DialogProps){
    const closeDialog = () => {
        const controller = DialogController.getInstance();
        controller.closeDialog(dialogId);
    };

    return (
        <aside className="dialog">
            <div className="dialog--header">
                <h2 className="dialog--title">Dialog title</h2>
                <div className="dialog--header-buttons">
                    <button className="dialog--close-button" onClick={closeDialog}>X</button>
                </div>
            </div>
            <div className="dialog--content">
                {children}
            </div>
        </aside>
    );
}

export default Dialog;
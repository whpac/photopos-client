import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Dialog.scss';
import DialogController from './DialogController';

interface DialogProps {
    dialogId: string;
    title: string;
    children: React.ReactNode;
};

function Dialog({ dialogId, title, children }: DialogProps){
    const closeDialog = () => {
        const controller = DialogController.getInstance();
        controller.closeDialog(dialogId);
    };

    return (
        <dialog open className="dialog" aria-modal="true">
            <div className="dialog--header">
                <h2 className="dialog--title">{title}</h2>
                <div className="dialog--header-buttons">
                    <button onClick={closeDialog} aria-label="Close" title="Close" type="button">
                        <FontAwesomeIcon icon={icon({name: 'xmark', style: 'solid'})} />
                    </button>
                </div>
            </div>
            <div className="dialog--content">
                {children}
            </div>
        </dialog>
    );
}

export default Dialog;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Dialog.scss';
import DialogController from './DialogController';
import Button from '../forms/Button';

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
                    <Button onClick={closeDialog}>
                        <FontAwesomeIcon icon={icon({name: 'xmark', style: 'solid'})} />
                    </Button>
                </div>
            </div>
            <div className="dialog--content">
                {children}
            </div>
        </dialog>
    );
}

export default Dialog;
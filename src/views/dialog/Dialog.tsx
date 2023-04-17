import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Dialog.scss';
import DialogController from './DialogController';
import Button from '../forms/Button';

interface DialogProps {
    dialogId: string;
    title: string;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
};

function Dialog({ dialogId, title, children, size }: DialogProps) {
    size ??= 'medium';

    const closeDialog = () => {
        const controller = DialogController.getInstance();
        controller.closeDialog(dialogId);
    };

    let dialogClasses = ['dialog'];
    dialogClasses.push(`dialog__${size}`);

    return (
        <dialog open className={dialogClasses.join(' ')} aria-modal="true">
            <div className="dialog--header">
                <h2 className="dialog--title">{title}</h2>
                <div className="dialog--header-buttons">
                    <Button onClick={closeDialog}>
                        <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
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
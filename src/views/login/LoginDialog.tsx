import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import Button from '../forms/Button';
import InputBox from '../forms/InputBox';
import FieldLayout from '../forms/FieldLayout';
import './LoginDialog.scss';
import DialogButtons from '../dialog/DialogButtons';
import DialogController from '../dialog/DialogController';
import RegisterDialog from './RegisterDialog';
import ForgotDialog from './ForgotDialog';
import SessionManager from '../../dataModel/session/SessionManager';
import FormParagraph from '../forms/FormParagraph';
import Photopos from '../../dataModel/Photopos';

interface LoginDialogProps {
    dialogId: string;
    defaultUsername?: string;
};

function getErrorMessageForCode(code: string | null) {
    switch(code) {
        case SessionManager.ERROR_CREDENTIALS:
            return 'Invalid username or password.';
        case SessionManager.ERROR_NETWORK:
            return 'A network error occurred.';
        default:
            return 'An unknown error occurred.';
    }
}

function LoginDialog({ dialogId, defaultUsername }: LoginDialogProps) {
    const [username, setUsername] = useState(defaultUsername ?? '');
    const [password, setPassword] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const displayRegisterDialog = () => displayDialog('registerDialog', RegisterDialog);
    const displayForgotDialog = () => displayDialog('forgotDialog', ForgotDialog);

    const displayDialog = (newDialogId: string, DialogToShow: typeof LoginDialog) => {
        const dialogController = DialogController.getInstance();
        dialogController.showDialog(newDialogId,
            <DialogToShow
                dialogId={newDialogId}
                defaultUsername={username} />
        );
        dialogController.closeDialog(dialogId);
    };

    const logIn = async () => {
        setFormDisabled(true);

        try {
            await Photopos.sessionManager.logIn(username, password);
            const dialogController = DialogController.getInstance();
            dialogController.closeDialog(dialogId);
        } catch(e: unknown) {
            let errorCode: string | null = null;
            if(e instanceof Error) {
                errorCode = e.message;
            }
            setError(getErrorMessageForCode(errorCode));
            setFormDisabled(false);
        }
    };

    return (
        <Dialog dialogId={dialogId} title="Log in" size="small" closeDisabled={formDisabled}>
            <form onSubmit={(e) => {
                e.preventDefault();
                logIn();
            }}>
                {error && <FormParagraph>{error}</FormParagraph>}
                <FieldLayout label="Username" inputId="login-username">
                    <InputBox
                        value={username}
                        onChange={setUsername}
                        id="login-username"
                        disabled={formDisabled} />
                </FieldLayout>
                <FieldLayout label="Password" inputId="login-password">
                    <InputBox
                        type="password"
                        value={password}
                        onChange={setPassword}
                        id="login-password"
                        disabled={formDisabled} />
                </FieldLayout>
                <div className="login-dialog--forgot">
                    <Button
                        onClick={displayForgotDialog}
                        isLink={true}
                        disabled={formDisabled}>
                        Forgot password?
                    </Button>
                </div>
                <DialogButtons>
                    <Button
                        onClick={displayRegisterDialog}
                        disabled={formDisabled}>
                        Register
                    </Button>
                    <Button
                        isPrimary={true}
                        isSubmit={true}
                        disabled={formDisabled}>
                        Log in
                    </Button>
                </DialogButtons>
            </form>
        </Dialog>
    );
}

export default LoginDialog;
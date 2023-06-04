import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import Button from '../forms/Button';
import InputBox from '../forms/InputBox';
import FieldLayout from '../forms/FieldLayout';
import DialogButtons from '../dialog/DialogButtons';
import DialogController from '../dialog/DialogController';
import LoginDialog from './LoginDialog';
import Photopos from '../../dataModel/Photopos';
import FormParagraph from '../forms/FormParagraph';

interface RegisterDialogProps {
    dialogId: string;
    defaultUsername?: string;
};

function RegisterDialog({ dialogId, defaultUsername }: RegisterDialogProps) {
    const [username, setUsername] = useState(defaultUsername ?? '');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState<string | null>(null);

    const displayLoginDialog = () => {
        const dialogController = DialogController.getInstance();
        const loginDialogId = 'loginDialog';
        dialogController.showDialog(loginDialogId,
            <LoginDialog
                dialogId={loginDialogId}
                defaultUsername={username} />
        );
        dialogController.closeDialog(dialogId);
    };

    const register = async () => {
        if(password !== password2) {
            setError('Passwords do not match.');
            return;
        } else {
            setError(null);
        }

        await Photopos.sessionManager.register(username, password);
        const dialogController = DialogController.getInstance();
        dialogController.closeDialog(dialogId);
        dialogController.showDialog('loginDialog',
            <LoginDialog
                dialogId="loginDialog"
                defaultUsername={username} />
        );
    };

    return (
        <Dialog dialogId={dialogId} title="Register" size="small">
            {error && <FormParagraph>{error}</FormParagraph>}
            <FieldLayout label="Username" inputId="register-username">
                <InputBox value={username} onChange={setUsername} id="register-username" />
            </FieldLayout>
            <FieldLayout label="Password" inputId="register-password">
                <InputBox type="password" value={password} onChange={setPassword} id="register-password" />
            </FieldLayout>
            <FieldLayout label="Retype password" inputId="register-password-repeat">
                <InputBox type="password" value={password2} onChange={setPassword2} id="register-password-repeat" />
            </FieldLayout>
            <DialogButtons>
                <Button onClick={displayLoginDialog}>Back</Button>
                <Button onClick={register} isPrimary={true}>Register</Button>
            </DialogButtons>
        </Dialog>
    );
}

export default RegisterDialog;
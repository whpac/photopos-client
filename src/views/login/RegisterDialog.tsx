import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import Button from '../forms/Button';
import InputBox from '../forms/InputBox';
import FieldLayout from '../forms/FieldLayout';
import DialogButtons from '../dialog/DialogButtons';
import DialogController from '../dialog/DialogController';
import LoginDialog from './LoginDialog';

interface RegisterDialogProps {
    dialogId: string;
    defaultUsername?: string;
};

function RegisterDialog({ dialogId, defaultUsername }: RegisterDialogProps) {
    const [username, setUsername] = useState(defaultUsername ?? '');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

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

    return (
        <Dialog dialogId={dialogId} title="Register" size="small">
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
                <Button isPrimary={true}>Register</Button>
            </DialogButtons>
        </Dialog>
    );
}

export default RegisterDialog;
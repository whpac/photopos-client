import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import Button from '../forms/Button';
import InputBox from '../forms/InputBox';
import FieldLayout from '../forms/FieldLayout';
import './LoginDialog.scss';
import DialogButtons from '../dialog/DialogButtons';
import DialogController from '../dialog/DialogController';
import RegisterDialog from './RegisterDialog';

interface LoginDialogProps {
    dialogId: string;
    defaultUsername?: string;
};

function LoginDialog({ dialogId, defaultUsername }: LoginDialogProps) {
    const [username, setUsername] = useState(defaultUsername ?? '');
    const [password, setPassword] = useState('');

    const displayRegisterDialog = () => {
        const dialogController = DialogController.getInstance();
        const registerDialogId = 'registerDialog';
        dialogController.showDialog(registerDialogId,
            <RegisterDialog
                dialogId={registerDialogId}
                defaultUsername={username} />
        );
        dialogController.closeDialog(dialogId);
    };

    return (
        <Dialog dialogId={dialogId} title="Log in" size="small">
            <FieldLayout label="Username" inputId="login-username">
                <InputBox value={username} onChange={setUsername} id="login-username" />
            </FieldLayout>
            <FieldLayout label="Password" inputId="login-password">
                <InputBox type="password" value={password} onChange={setPassword} id="login-password" />
            </FieldLayout>
            <div className="login-dialog--forgot">
                <Button isLink={true}>Forgot password?</Button>
            </div>
            <DialogButtons>
                <Button onClick={displayRegisterDialog}>Register</Button>
                <Button isPrimary={true}>Log in</Button>
            </DialogButtons>
        </Dialog>
    );
}

export default LoginDialog;;
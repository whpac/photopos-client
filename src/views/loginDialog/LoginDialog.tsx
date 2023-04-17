import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import Button from '../forms/Button';
import InputBox from '../forms/InputBox';
import FieldLayout from '../forms/FieldLayout';
import './LoginDialog.scss';
import DialogButtons from '../dialog/DialogButtons';

interface LoginDialogProps {
    dialogId: string;
};

function LoginDialog({ dialogId }: LoginDialogProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                <Button>Register</Button>
                <Button isPrimary={true}>Log in</Button>
            </DialogButtons>
        </Dialog>
    );
}

export default LoginDialog;
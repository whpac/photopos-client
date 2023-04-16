import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import Button from '../forms/Button';
import InputBox from '../forms/InputBox';
import FieldLayout from '../forms/FieldLayout';

interface LoginDialogProps {
    dialogId: string;
};

function LoginDialog({ dialogId }: LoginDialogProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Dialog dialogId={dialogId} title="Log in">
            <FieldLayout label="Username" inputId="login-username">
                <InputBox value={username} onChange={setUsername} id="login-username" />
            </FieldLayout>
            <FieldLayout label="Password" inputId="login-password">
                <InputBox type="password" value={password} onChange={setPassword} id="login-password" />
            </FieldLayout>
            Forgot password?
            <Button>Register</Button>
            <Button isPrimary={true}>Log in</Button>
        </Dialog>
    );
}

export default LoginDialog;
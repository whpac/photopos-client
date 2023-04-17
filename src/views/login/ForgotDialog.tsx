import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import Button from '../forms/Button';
import InputBox from '../forms/InputBox';
import FieldLayout from '../forms/FieldLayout';
import DialogButtons from '../dialog/DialogButtons';
import DialogController from '../dialog/DialogController';
import LoginDialog from './LoginDialog';
import FormParagraph from '../forms/FormParagraph';

interface ForgotDialogProps {
    dialogId: string;
    defaultUsername?: string;
};

function ForgotDialog({ dialogId, defaultUsername }: ForgotDialogProps) {
    const [username, setUsername] = useState(defaultUsername ?? '');
    const [email, setEmail] = useState('');

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
        <Dialog dialogId={dialogId} title="Restore password" size="small">
            <FormParagraph>
                Enter your username and e-mail address to regain access to your account.
            </FormParagraph>
            <FieldLayout label="Username" inputId="forgot-username">
                <InputBox value={username} onChange={setUsername} id="forgot-username" />
            </FieldLayout>
            <FieldLayout label="E-mail address" inputId="forgot-email">
                <InputBox type="email" value={email} onChange={setEmail} id="forgot-email" />
            </FieldLayout>
            <DialogButtons>
                <Button onClick={displayLoginDialog}>Back</Button>
                <Button isPrimary={true}>Restore</Button>
            </DialogButtons>
        </Dialog>
    );
}

export default ForgotDialog;
import Dialog from '../dialog/Dialog';

interface LoginDialogProps {
    dialogId: string;
};

function LoginDialog({ dialogId }: LoginDialogProps){
    return (
        <Dialog dialogId={dialogId} title="Log in">
            Type your username and password here.
        </Dialog>
    );
}

export default LoginDialog;
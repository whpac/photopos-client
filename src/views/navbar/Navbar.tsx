import DialogController from '../dialog/DialogController';
import Button from '../forms/Button';
import LoginDialog from '../loginDialog/LoginDialog';
import "./Navbar.scss";

function Navbar() {
    const displayLoginDialog = () => {
        const dialogController = DialogController.getInstance();
        const loginDialogId = 'loginDialog';
        dialogController.showDialog(loginDialogId, <LoginDialog dialogId={loginDialogId} />);
    };

    return (
        <nav>
            <div className="navLeft">
                <h1>Photopos</h1>
            </div>
            <div className="navRight">
                <ul>
                    <li><Button onClick={displayLoginDialog}>Log in</Button></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
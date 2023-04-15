import DialogController from '../dialog/DialogController';
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
                    <li><button type="button" onClick={displayLoginDialog}>Log in</button></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
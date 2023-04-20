import { useEffect, useState } from 'react';
import DialogController from '../dialog/DialogController';
import Button from '../forms/Button';
import LoginDialog from '../login/LoginDialog';
import "./Navbar.scss";
import Photopos from '../../dataModel/Photopos';

function Navbar() {
    const [_, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        const sessionManager = Photopos.sessionManager;
        setSessionId(sessionManager.sessionId);

        const listener = () => setSessionId(sessionManager.sessionId);
        sessionManager.onSessionIdChanged.addListener(listener);
        return () => sessionManager.onSessionIdChanged.removeListener(listener);
    });

    const displayLoginDialog = () => {
        const dialogController = DialogController.getInstance();
        const loginDialogId = 'loginDialog';
        dialogController.showDialog(loginDialogId, <LoginDialog dialogId={loginDialogId} />);
    };

    const logOut = () => {
        Photopos.sessionManager.logOut();
    };

    const isLoggedIn = Photopos.sessionManager.isLoggedIn();

    return (
        <nav>
            <div className="navLeft">
                <h1>Photopos</h1>
            </div>
            <div className="navRight">
                <ul>
                    {!isLoggedIn && <li><Button onClick={displayLoginDialog}>Log in</Button></li>}
                    {isLoggedIn && <li><Button onClick={logOut}>Log out</Button></li>}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
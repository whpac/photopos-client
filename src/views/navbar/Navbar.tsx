import "./Navbar.scss";

function Navbar() {
    return (
        <nav>
            <div className="navLeft">
                <h1>Photopos</h1>
            </div>
            <div className="navRight">
                <ul>
                    <li>Log in</li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
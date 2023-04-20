import './App.scss';
import HomePage from './pages/home/HomePage';
import DialogManager from './views/dialog/DialogManager';
import Navbar from './views/navbar/Navbar';

function App() {
    return (
        <div className="photopos-container">
            <div className="photopos-header">
                <Navbar />
            </div>
            <div className="photopos-content">
                <HomePage />
            </div>
            <DialogManager />
        </div>
    );
}

export default App;

import './App.scss';
import HomePage from './pages/home/HomePage';
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
        </div>
    );
}

export default App;

import './App.scss';
import HomePage from './pages/home/HomePage';

function App() {
    return (
        <div className="photopos-container">
            <div className="photopos-header">
                <h1>PhotoPos</h1>
            </div>
            <div className="photopos-content">
                <HomePage />
            </div>
        </div>
    );
}

export default App;

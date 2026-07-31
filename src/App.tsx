import './styles/theme.css';
import { MonolithicGrid } from './components/MonolithicGrid';

export function App() {
  return (
    <div className="app-root-wrapper">
      <div className="app-main-container">
        <MonolithicGrid />
      </div>
    </div>
  );
}

export default App;

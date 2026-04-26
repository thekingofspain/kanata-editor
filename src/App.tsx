import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';

function App() {
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Toolbar />
      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <Canvas />
      </div>
    </div>
  );
}

export default App;
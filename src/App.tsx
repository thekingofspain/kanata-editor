import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanel } from './components/PropertiesPanel';

function App() {
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Toolbar />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Canvas />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
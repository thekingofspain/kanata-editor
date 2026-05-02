import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { StatusBar } from './components/StatusBar';

function App() {
  return (
    <div className="app">
      <Toolbar />
      <div className="app-main">
        <div className="app-canvas">
          <Canvas />
        </div>
        <PropertiesPanel />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
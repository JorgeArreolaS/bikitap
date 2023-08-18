import KeyboardOverlay from 'components/KeyboardOverlay';
import Hyperspace from 'components/hyperspace';

function App() {
  return (
    <main className="h-screen bg-background text-foreground dark">
      <div className="relative h-screen w-full">
        <Hyperspace />
        <KeyboardOverlay />
      </div>
    </main>
  );
}

export default App;

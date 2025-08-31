import "./App.css";
import Viewport from "./Viewport/Viewport";

function App() {
  return (
    <div class="app">
      <Viewport width="100vw" height="100dvh" count={30} />
    </div>
  );
}

export default App;

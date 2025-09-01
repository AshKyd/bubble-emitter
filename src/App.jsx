import "./app.css";
import Viewport from "./Viewport/Viewport.jsx";

export function App() {
  return (
    <>
      <Viewport width="100vw" height="100dvh" count={30} />
    </>
  );
}

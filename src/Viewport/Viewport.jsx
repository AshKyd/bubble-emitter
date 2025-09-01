import "./viewport.css";
import Bubble from "../Bubble/Bubble";
import popSrc from "./pop-91931.mp3";
import { useRef } from "preact/hooks";

function Viewport({ width = "100vw", height = "100dvh", count = 20 }) {
  const audioRef = useRef(document.createElement("audio"));
  // Generate random positions for bubbles
  const positions = Array.from({ length: count }).map(
    () =>
      Math.random() *
      (typeof width === "string" && width.includes("vw")
        ? window.innerWidth
        : typeof width === "number"
        ? width
        : parseInt(width) || window.innerWidth)
  );

  // Viewport style based on props
  const viewportStyle = {
    width: width,
    height: height,
  };

  return (
    <div class="viewport" style={viewportStyle}>
      {positions.map((left, index) => (
        <Bubble
          key={index}
          position={{ x: left, y: 0 }}
          size={Math.round(Math.random() * 125 + 25)}
          delay={0 - (Math.random() * 5).toFixed(2) + "s"}
          onPop={() => {
            audioRef.current.play();
          }}
        />
      ))}
      <audio src={popSrc} paused ref={audioRef} />
    </div>
  );
}

export default Viewport;

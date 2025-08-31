import "./viewport.css";
import Bubble from "../Bubble/Bubble";

function Viewport({ width = "100vw", height = "100dvh", count = 20 }) {
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
          size={Math.round(Math.random() * 100 + 50)}
          duration={(3 + Math.random() * 6).toFixed(2) + "s"}
          delay={(Math.random() * 5).toFixed(2) + "s"}
        />
      ))}
    </div>
  );
}

export default Viewport;

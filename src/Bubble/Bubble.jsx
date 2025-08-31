import "./bubble.css";

function Bubble({ size = 100, position, delay = "0s" }) {
  // Larger bubbles (higher size) go quicker, smaller bubbles go slower
  const newDuration = `${4 * (150 / size)}s`;
  const bubbleStyle = {
    "--diameter": `${size}px`,
    "--duration": newDuration,
    "--delay": delay,
    position: "absolute",
    left: `${position.x}px`,
    top: `${0}px`,
  };

  return (
    <div className="bubble__float" style={bubbleStyle}>
      <div className="bubble"></div>
    </div>
  );
}

export default Bubble;

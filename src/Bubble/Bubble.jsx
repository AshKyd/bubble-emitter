import "./bubble.css";

function Bubble({ size, position, duration = "4s", delay = "0s" }) {
  const bubbleStyle = {
    "--diameter": `${size}px`,
    "--duration": duration,
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

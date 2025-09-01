import { useState } from "preact/hooks";
import "./bubble.css";

function Bubble({ size = 100, position, delay = "0s", onPop }) {
  const [isPopped, setIsPopped] = useState(false);
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

  const unPop = isPopped
    ? ({ target }) => {
        if (target.classList.contains("bubble__float")) {
          setIsPopped(false);
        }
      }
    : undefined;

  return (
    <div
      className="bubble__float"
      style={bubbleStyle}
      onAnimationIteration={unPop}
    >
      <div
        className={`bubble__popper bubble__popper--${
          isPopped ? "popped" : "active"
        }`}
        onClick={() => {
          setIsPopped(true);
          onPop();
        }}
      >
        <div className="bubble"></div>
      </div>
    </div>
  );
}

export default Bubble;

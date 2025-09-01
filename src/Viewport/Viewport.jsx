import "./viewport.css";
import Bubble from "../Bubble/Bubble";
import popSrc from "./pop-91931.mp3";
import { useRef, useEffect, useState } from "preact/hooks";

function Viewport({ width = "100vw", height = "100dvh", count = 20 }) {
  const soundEffectPositions = [104, 1560, 2819];
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);

  // Initialize Web Audio API
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();

        // Load audio file
        const response = await fetch(popSrc);
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current = await audioContextRef.current.decodeAudioData(
          arrayBuffer
        );

        setAudioReady(true);
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
    };

    initAudio();

    // Cleanup
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play sound effect at specific position
  const playSoundEffect = (position) => {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    // Create audio source
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;

    // Set playback position (convert milliseconds to seconds)
    const startTime = position / 1000;
    const duration = 0.2; // 200ms

    // Connect to output
    source.connect(audioContextRef.current.destination);

    // Play the sound
    source.start(0, startTime, duration);
  };

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
            if (audioReady) {
              // Select a random position from soundEffectPositions
              const randomPosition =
                soundEffectPositions[
                  Math.floor(Math.random() * soundEffectPositions.length)
                ];

              // Play the sound effect
              playSoundEffect(randomPosition);
            }
          }}
        />
      ))}
    </div>
  );
}

export default Viewport;

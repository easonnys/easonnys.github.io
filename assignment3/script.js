// This script controls the sound interaction on the DJ soundpad
document.addEventListener("DOMContentLoaded", () => {
  const sounds = [
    { id: 1, file: "sfx/guitarloop.wav", color: "#ff4d4d", key: "q" },
    { id: 2, file: "sfx/beatsloop.wav", color: "#ffb34d", key: "w" },
    { id: 3, file: "sfx/buildupdroploop.wav", color: "#ffff4d", key: "e" },
    { id: 4, file: "sfx/elecguitarloop.wav", color: "#4dff4d", key: "a" },
    { id: 5, file: "sfx/funkloop.wav", color: "#4dffff", key: "s" },
    { id: 6, file: "sfx/lofikeyloop.wav", color: "#4d4dff", key: "d" },
    { id: 7, file: "sfx/pianoloop.wav", color: "#b34dff", key: "z" },
    { id: 8, file: "sfx/rhodesploop.wav", color: "#ff4db3", key: "x" },
    { id: 9, file: "sfx/vocalloops.wav", color: "#4dffb3", key: "c" },
  ];

  const soundMap = {};

  sounds.forEach((sound) => {
    // Get the button element and the corresponding slider
    const button = document.querySelector(`.sound${sound.id} .sound-box`);
    const slider = document.querySelector(`.sound${sound.id} .volume-slider`);
    const audio = new Audio(sound.file);
    audio.loop = true; // Set the audio to loop
    audio.volume = 0.5; // Initialize with slider value

    soundMap[sound.key] = { audio, button };

    // Add a keyframe animation for button glow
    const keyframes = `
      @keyframes pulseSound${sound.id} {
        0%, 100% { transform: scale(1); box-shadow: 0 0 10px ${sound.color}; }
        50% { transform: scale(1.1); box-shadow: 0 0 20px ${sound.color}; }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    // Button event listener
    const togglePlayPause = () => {
      if (audio.paused) {
        audio.currentTime = 0; // Reset audio to the beginning
        audio.play();
        button.classList.add("playing");
        button.style.animation = `pulseSound${sound.id} 1s ease-in-out infinite`;
      } else {
        audio.pause();
        button.classList.remove("playing");
        button.style.animation = ""; // Stop the animation
      }
    };

    button.addEventListener("click", togglePlayPause);

    // Slider input event listener
    slider.addEventListener("input", () => {
      // Set the audio volume based on slider
      audio.volume = slider.value / 100;
    });
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (soundMap[key]) {
      const { audio, button } = soundMap[key];
      button.click(); // Trigger the button click programmatically
    }
  });
});

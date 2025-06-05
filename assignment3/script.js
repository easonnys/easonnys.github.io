document.addEventListener("DOMContentLoaded", () => {
  const tutorial = document.getElementById("tutorial"); // Select tutorial overlay element
  const startButton = document.getElementById("startButton"); // Select start button element

  // Load click sound
  const clickSound = new Audio("sfx/startsound.mp3"); // Load audio file for start button click

  // Play sound on button click
  startButton.addEventListener("click", () => {
    clickSound.currentTime = 0; // Reset sound to start from the beginning
    clickSound.play(); // Play the sound

    tutorial.style.opacity = "0"; // Fade out tutorial overlay
    setTimeout(() => {
      tutorial.style.display = "none"; // Hide tutorial after fade-out
    }, 500); // Duration to match the transition
  });

  // Array of sounds with properties
  const sounds = [
    { id: 1, file: "sfx/guitarloop.wav", color: "#ff4d4d", key: "q" }, // Sound 1
    { id: 2, file: "sfx/beatsloop.wav", color: "#ffb34d", key: "w" }, // Sound 2
    { id: 3, file: "sfx/buildupdroploop.wav", color: "#ffff4d", key: "e" }, // Sound 3
    { id: 4, file: "sfx/elecguitarloop.wav", color: "#4dff4d", key: "a" }, // Sound 4
    { id: 5, file: "sfx/funkloop.wav", color: "#4dffff", key: "s" }, // Sound 5
    { id: 6, file: "sfx/lofikeyloop.wav", color: "#4d4dff", key: "d" }, // Sound 6
    { id: 7, file: "sfx/pianoloop.wav", color: "#b34dff", key: "z" }, // Sound 7
    { id: 8, file: "sfx/rhodesploop.wav", color: "#ff4db3", key: "x" }, // Sound 8
    { id: 9, file: "sfx/vocalloops.wav", color: "#4dffb3", key: "c" }, // Sound 9
  ];

  const soundMap = {}; // Initialize empty object to map sounds by key

  sounds.forEach((sound) => {
    const button = document.querySelector(`.sound${sound.id} .sound-box`); // Select button element for sound
    const slider = document.querySelector(`.sound${sound.id} .volume-slider`); // Select slider for volume control
    const audio = new Audio(sound.file); // Create new audio element with sound file
    audio.loop = true; // Set audio to loop
    audio.volume = 0.5; // Set initial volume
    soundMap[sound.key] = { audio, button }; // Map audio and button to key

    // Define keyframe animation for button pulse
    const keyframes = `
      @keyframes pulseSound${sound.id} {
        0%, 100% { transform: scale(1); box-shadow: 0 0 10px ${sound.color}; }
        50% { transform: scale(1.1); box-shadow: 0 0 20px ${sound.color}; }
      }
    `;
    const styleSheet = document.createElement("style"); // Create style element for keyframes
    styleSheet.type = "text/css"; // Set type for stylesheet
    styleSheet.innerText = keyframes; // Add keyframes to stylesheet
    document.head.appendChild(styleSheet); // Append keyframes to document head

    const togglePlayPause = () => {
      if (audio.paused) {
        audio.currentTime = 0; // Reset audio to start
        audio.play(); // Play audio
        button.classList.add("playing"); // Add 'playing' class to button for styling
        button.style.animation = `pulseSound${sound.id} 1s ease-in-out infinite`; // Apply pulse animation
      } else {
        audio.pause(); // Pause audio
        button.classList.remove("playing"); // Remove 'playing' class
        button.style.animation = ""; // Remove animation
      }
    };

    button.addEventListener("click", togglePlayPause); // Add click event to toggle audio

    slider.addEventListener("input", () => {
      audio.volume = slider.value / 100; // Set audio volume based on slider input
    });
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase(); // Get pressed key and convert to lowercase
    if (soundMap[key]) {
      soundMap[key].button.click(); // Trigger click on corresponding button if key is mapped
    }
  });
});

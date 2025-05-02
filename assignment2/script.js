let isTimerRunning = false;
let interval;
let lastSelectedTime = 15;
let time; // Variable to store remaining time for the countdown

// Play/Pause functionality for the audio player
function togglePlayPause() {
  const audio = document.querySelector("#audio-player"); // Using querySelector for audio element
  const playIcon = document.querySelector("#play-icon"); // Play icon
  const pauseIcon = document.querySelector("#pause-icon"); // Pause icon

  // Toggle between play and pause
  if (audio.paused) {
    audio.play();
    playIcon.style.display = "none"; // Hide play icon
    pauseIcon.style.display = "inline"; // Show pause icon
  } else {
    audio.pause();
    playIcon.style.display = "inline"; // Show play icon
    pauseIcon.style.display = "none"; // Hide pause icon
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const myAudio = document.querySelector("#audio-player");
  const progressBar = document.querySelector("#progress-bar");

  myAudio.addEventListener("timeupdate", updateProgress);

  function updateProgress() {
    const duration = (myAudio.currentTime / myAudio.duration) * 100;
    progressBar.style.width = duration + "%";
  }
});
// Seek to a position on the progress bar when clicked
function seekAudio(event) {
  const progressContainer = document.querySelector(".progress-container"); // Progress container
  const audio = document.querySelector("#audio-player"); // Audio element
  const rect = progressContainer.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const seekTime = (clickX / width) * audio.duration;
  audio.currentTime = seekTime;
}

// Focus Timer Functions (Existing Code)
function startTimer() {
  const display = document.querySelector("#countdown-display"); // Countdown display
  const button = document.querySelector("#start-button"); // Start/Pause button
  const select = document.querySelector("#time-select"); // Time selector

  // Set last selected time and time only when starting fresh
  if (
    !isTimerRunning &&
    (time == null || select.value != lastSelectedTime.toString())
  ) {
    lastSelectedTime = parseInt(select.value); // Update last selected time
    time = lastSelectedTime * 60; // Convert to seconds and store
  }

  let minutes, seconds;

  // If the timer is not running, start the countdown
  if (!isTimerRunning) {
    interval = setInterval(function () {
      minutes = Math.floor(time / 60); // Get minutes
      seconds = time % 60; // Get remaining seconds

      // Update the countdown display
      display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      // Timer reaches 0 — stop the interval
      if (time <= 0) {
        clearInterval(interval); // Stop the interval
        display.textContent = "0:00"; // Reset display
        button.textContent = "Start"; // Change button text to Start
        document.querySelector("#audio-player").pause(); // Pause music
        isTimerRunning = false; // Set timer as not running
        display.classList.remove("pulsing"); // Remove pulsing animation
        alert("Timer Over!"); // Notify user
        time = null; // Reset time variable so timer can start fresh next time
      } else {
        time--; // countdown
      }
    }, 1000); // Repeat every second

    button.textContent = "Pause"; // Change button to Pause
    isTimerRunning = true; // Mark timer as running
    display.classList.add("pulsing"); // Add pulsing animation
    document.querySelector("#audio-player").play(); // Play music when the timer starts
  }
}

// Manual pause
function pauseTimer() {
  const button = document.querySelector("#start-button"); // Get start button
  const display = document.querySelector("#countdown-display");
  clearInterval(interval); // Stop the timer as it is
  button.textContent = "Start"; // Change the button text to Start
  isTimerRunning = false; // Pause the timer
  display.classList.remove("pulsing"); // Remove animation
}

// Manual reset
function resetTimer() {
  const display = document.querySelector("#countdown-display"); // Get countdown display
  const button = document.querySelector("#start-button"); // Get button
  const select = document.querySelector("#time-select"); // Get timer selector

  clearInterval(interval); // Stop the timer
  display.textContent = "0:00"; // Reset display to 0:00

  // Set the dropdown back to the last selected time
  select.value = lastSelectedTime; // Set the dropdown to the last selected time
  time = lastSelectedTime * 60; // Reset time variable to the last selected value in seconds

  // Reset the time to the selected value and reset button text
  button.textContent = "Start"; // Button back to start
  isTimerRunning = false; // Set timer as not running
  display.classList.remove("pulsing"); // Remove animation
}

// Toggle between pause and start using one button
function toggleTimer() {
  const button = document.querySelector("#start-button");

  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

// Event listener for updating progress bar
document
  .querySelector("#audio-player")
  .addEventListener("timeupdate", updateProgress);

// Event listener for seeking the audio by clicking on the progress bar
document
  .querySelector(".progress-container")
  .addEventListener("click", seekAudio);
//falling leaves
const leafContainer = document.getElementById("falling-leaves");

function createLeaf() {
  const leaf = document.createElement("img");
  leaf.src = "leaves.png";
  leaf.classList.add("leaf");

  // random horizontal position
  leaf.style.left = `${Math.random() * 100}vw`;

  // random animation duration
  const duration = 5 + Math.random() * 5;
  leaf.style.animationDuration = `${duration}s`;

  // random horizontal drift using CSS variable
  const drift = (Math.random() - 0.5) * 200;
  leaf.style.setProperty("--x-drift", `${drift}px`);

  leafContainer.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, duration * 1000);
}

// drop a new leaf every 300ms
setInterval(createLeaf, 300);

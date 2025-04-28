let isTimerRunning = false; // Track if the timer is running
let interval; // Interval to update timer display
let lastSelectedTime = 15; // Last selected time (default to 15 minutes)
let time; // Remaining time for the countdown

// Start or pause the timer based on the current state
function toggleTimer() {
  const display = document.querySelector("#countdown-display"); // Countdown display
  const button = document.querySelector("#start-button"); // Start/Pause button
  const select = document.querySelector("#time-select"); // Time selector

  // If the timer is running, pause it
  if (isTimerRunning) {
    clearInterval(interval); // Stop the interval
    button.textContent = "Start"; // Change button to "Start"
    isTimerRunning = false; // Timer is now paused
    document.querySelector("#audio-player").pause(); // Pause music
  } else {
    // If the timer is not running, start it
    time = parseInt(select.value) * 60; // Get the time in seconds from the dropdown
    interval = setInterval(function () {
      let minutes = Math.floor(time / 60); // Get minutes
      let seconds = time % 60; // Get seconds

      // Update the countdown display
      display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      // Decrease the time by 1 second
      time--;

      // If the timer reaches 0, stop the interval
      if (time <= 0) {
        clearInterval(interval); // Stop the interval
        display.textContent = "0:00"; // Reset the display to 0:00
        button.textContent = "Start"; // Change button to "Start"
        document.querySelector("#audio-player").pause(); // Pause music
        isTimerRunning = false; // Set timer as not running
        alert("Timer Over!"); // Show timer over message
      }
    }, 1000); // Update every second

    button.textContent = "Pause"; // Change button to "Pause"
    isTimerRunning = true; // Timer is now running
    document.querySelector("#audio-player").play(); // Play music
  }
}

// Manual reset
function resetTimer() {
  const display = document.querySelector("#countdown-display"); // Countdown display
  const button = document.querySelector("#start-button"); // Start button
  const select = document.querySelector("#time-select"); // Time selector

  clearInterval(interval); // Stop the timer
  display.textContent = "0:00"; // Reset the display to 0:00

  // Set the dropdown back to the last selected time
  select.value = lastSelectedTime; // Set the dropdown to the last selected time
  time = lastSelectedTime * 60; // Reset the time variable to the last selected value in seconds

  // Reset button text and timer state
  button.textContent = "Start"; // Set button text back to "Start"
  isTimerRunning = false; // Set timer as not running
}

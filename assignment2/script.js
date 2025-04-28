// Variables to store timer state and last selected time
let isTimerRunning = false; // Track if timer is running
let interval; // Interval to update timer display
let lastSelectedTime = 15; // Variable to store the last selected timer value (default to 15 minutes)
let time; // Variable to store remaining time for the countdown

function startTimer() {
  const display = document.querySelector("#countdown-display"); // Countdown display
  const button = document.querySelector("#start-button"); // Start/Pause button
  const select = document.querySelector("#time-select"); // Time selector

  time = parseInt(select.value) * 60; // Get time in seconds from the selected value
  let minutes, seconds;

  // If the timer is not running start the interval
  if (!isTimerRunning) {
    interval = setInterval(function () {
      minutes = Math.floor(time / 60); // Get minutes
      seconds = time % 60; // Get seconds

      // Update the countdown display
      display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      // Decrease the time by 1 second
      time--;

      // Timer reaches 0 stop the interval
      if (time <= 0) {
        clearInterval(interval); // Stop the interval
        display.textContent = "0:00"; // Reset the display to 0:00
        button.textContent = "Start"; // Change button text to Start
        document.querySelector("#audio-player").pause(); // Pause music
        isTimerRunning = false; // Set timer as not running
        alert("Timer Over!"); // Display timer over message
      }
    }, 1000); // Update every second

    button.textContent = "Pause"; // Change button to Pause
    isTimerRunning = true; // Set timer as running
    document.querySelector("#audio-player").play(); // Play music
  }
}

// Manual pause
function pauseTimer() {
  const button = document.querySelector("#start-button"); // Get start button
  clearInterval(interval); // Stop the timer as it is
  button.textContent = "Start"; // Change the button text to Start
  isTimerRunning = false; // Pause the timer
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
}

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import izitoast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const startBtn = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

startBtn.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
    stop();
    checkData(userSelectedDate);
  },
};

flatpickr("#datetime-picker", options);

function checkData(userSelectedDate) {
  const date = userSelectedDate instanceof Date ? userSelectedDate : new Date(userSelectedDate);

  const currentDate = new Date();

  if (date < currentDate) {
    izitoast.show({
      message: "Please choose a date in the future",
    });
    startBtn.disabled = true;
    return false;
  } else {
    startBtn.disabled = false;
    return true;
  }
}

let isActive = false;
let intervalId;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function start() {
  if (isActive) {
    return;
  };

  const isValidDate = checkData(userSelectedDate);

  if (!isValidDate) {
    return;
  }

  isActive = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;

    const time = convertMs(diff);
    updateClockface(time);

    if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      stop();
    }
  }, 1000);

  startBtn.disabled = true;
}

function stop() {
  if (!isActive) {
    return;
  }

  isActive = false;
  clearInterval(intervalId);
  startBtn.disabled = false;
}

function formatTime(value) {
  return String(value).padStart(2, "0");
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysElement.textContent = formatTime(days);
  hoursElement.textContent = formatTime(hours);
  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
}

startBtn.addEventListener("click", start);
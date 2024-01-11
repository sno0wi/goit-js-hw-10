import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import izitoast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

// ***CLASS****

// const startBtn = document.querySelector("[data-start]");
// const daysElement = document.querySelector("[data-days]");
// const hoursElement = document.querySelector("[data-hours]");
// const minutesElement = document.querySelector("[data-minutes]");
// const secondsElement = document.querySelector("[data-seconds]");

// let userSelectedDate;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//     onClose(selectedDates) {
//         userSelectedDate = selectedDates[0];
//         console.log(selectedDates[0]);
//         checkData(userSelectedDate);
//   },
// };
// flatpickr("#datetime-picker", options);

// function checkData(userSelectedDate) {
//     const date = userSelectedDate instanceof Date ? userSelectedDate : new Date(userSelectedDate);

//     const currentDate = new Date();

//     if (date < currentDate) {
//         izitoast.show({
//         message: "Please choose a date in the future"
//         });
//         startBtn.disabled = true;
//     } else {
//         startBtn.disabled = false;
//     }
// }

// class Timer {
//     constructor({ onTick }) {
//         this.onTick = onTick;
//         this.isActive = false;
//         this.intervalId = null;

//         this.initTimer();
//     }
    
//     initTimer() {
//         const time = this.convertMs(0);
//         this.onTick(time);
//     }

//     convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//     }


//     start() {
//         if (this.isActive) {
//             return;
//         }

//         this.initTimer();

//         this.isActive = true;

//         this.intervalId = setInterval(() => {
//             const currentTime = Date.now();
//             const diff = userSelectedDate - currentTime;

//             const time = this.convertMs(diff);
//             this.onTick(time);

//             if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
//                 this.stop();
//             }

//         }, 1000)

//         startBtn.disabled = true;
//     }

//     stop() {
//         if (!this.isActive) {
//       return;
//         }
        
//         this.isActive = false;
//         clearInterval(this.intervalId);
//         startBtn.disabled = false;
//     }
// }

// function addLeadingZero(value){
//     return String(value).padStart(2, "0");
//   }

// const timer = new Timer({
//     onTick: updateClockface,
// });

// startBtn.addEventListener("click", timer.start.bind(timer));

// function updateClockface({ days, hours, minutes, seconds }) {
//     daysElement.textContent = addLeadingZero(days);
//     hoursElement.textContent = addLeadingZero(hours);
//     minutesElement.textContent = addLeadingZero(minutes);
//     secondsElement.textContent = addLeadingZero(seconds);
// }

// ***CLASS****

const startBtn = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
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
  } else {
    startBtn.disabled = false;
  }
}

let isActive = false;
let intervalId;

function initTimer() {
  const time = convertMs(0);
  updateClockface(time);
}

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
  }

  initTimer();

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

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener("click", start);
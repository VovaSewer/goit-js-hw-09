
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';  

let refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    startBtn: document.querySelector('button[data-start]'),
    dateSelector: document.querySelector('#datetime-picker'),
};

refs.startBtn.disabled = true;
let timerId = null;
let startTimer = new Date();


refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {

       updateTimer();
   }, 1000);
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      if (selectedDates[0] < Date.now()) {
          window.alert (`Please choose a date in the future`)
      } else {
          refs.startBtn.disabled = false;
          startTimer = Date.parse(selectedDates[0]) - Date.now();
        //   console.log(startTimer);
          updateTimer();
      }
    },
  };

  flatpickr(refs.dateSelector, options);


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)); 
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

  function updateTimer() {
    if (startTimer > 1) {
        let formatedTime = convertMs(startTimer);
        // console.log(formatedTime);
        refs.days.textContent = addLeadingZero(formatedTime.days);
        refs.hours.textContent = addLeadingZero(formatedTime.hours);
        refs.minutes.textContent = addLeadingZero(formatedTime.minutes);
        refs.seconds.textContent = addLeadingZero(formatedTime.seconds);
    } else {
        clearInterval(timerId);
    }
    startTimer -= 1000;
}



//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
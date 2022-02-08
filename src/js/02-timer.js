
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';  

const refs = {
days: document.querySelector('[data-days]'),
hours: document.querySelector('[data-hours]'),
minutes: document.querySelector('[data-minutes]'),
seconds: document.querySelector('[data-seconds]'),
};

const startBtn = document.querySelector('button[data-start]');
const selector = document.querySelector('input#datetime-picker');

flatpickr(selector, options);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };



const timer = {
    // intervalId: null,
    // isActive: false,
    start() {
        // if(this.isActive){
        //     return;
        // }
        const startTime = Date.now(); 
        // this.isActive = true;
        // this.intervalId = 
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = convertMs(deltaTime);
            
            updateClockFace(time);
        }, 1000);
    },
};


startBtn.addEventListener ('click', ()=>{
    timer.start();
});



function updateClockFace ({days, hours, minutes, seconds}){
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  

    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute)); 
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
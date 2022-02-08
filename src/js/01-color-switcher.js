
const startRef = document.querySelector('[data-start]')
const stopRef = document.querySelector('[data-stop]')

let timerId = null; 
const btnDisable= false;

startRef.addEventListener('click', startBtn)
stopRef.addEventListener('click', stopBtn)

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function startBtn() {
    if (startRef.disabled === btnDisable)
        startRef.disabled = true;

        timerId = setInterval(() => {
            document.body.style.background = getRandomHexColor()
        }, 1000);
}

function stopBtn () {
    clearInterval(timerId);
    startRef.disabled = btnDisable;
}




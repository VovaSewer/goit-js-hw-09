
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  amount: document.querySelector('input[name="amount"]'),
  delay: document.querySelector('input[name="delay"]'),
  steps: document.querySelector('input[name="step"]'),
};


function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } 
        reject({ position, delay });
      }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  
  let amount = refs.amount.value;
  let delay = Number(refs.delay.value);
  let steps = refs.steps.value;
  console.log(`Delay`, delay);

  for (let i = 1; i <= amount; i++){
    let delay = Number(steps * i);
    console.log(`i {i} delay`, delay);
  
    
    createPromise(i, delay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${i} in ${delay} ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay} ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${i} in ${delay} ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay} ms`);
    });
  }  
}

refs.form.addEventListener('submit', onFormSubmit)
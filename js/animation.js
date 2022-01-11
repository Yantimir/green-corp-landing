const INCREASE_NUMBER_ANIMATION_SPEED = 50; //константа для задания скорости анимации

function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
        } else {
            element.innerText = i; // i*100 цикл не кончается
        }
        i += 100; //i++ 
    }
    setTimeout(function() {
        increaseNumberAnimationStep(i, element, endNumber);
    }, INCREASE_NUMBER_ANIMATION_SPEED);
  
} 
  
function initIncreaseNumberAnimation() {
    const element = document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0, element, 5000);
}
// initIncreaseNumberAnimation();

/*-------------------------------------------------------------------------------------*/

document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
    if (event.target.value === 'other') {
      const formContainer = document.createElement('div');
      formContainer.classList.add('form__group');
      formContainer.classList.add('form__other-input'); // Задание 1
   
      const input = document.createElement('input');
      input.placeholder = "Введите ваш вариант";
      input.type = "text"; // Задание 2
        
      formContainer.appendChild(input);
      document.querySelector('#form form').insertBefore(formContainer, document.querySelector('.form__submit')); // Задание 3
    }
   
    const otherInput = document.querySelector('.form__other-input');
    if (event.target.value !== 'other' && otherInput) { // Задание 5
    document.querySelector('#form form').removeChild(otherInput); // Задание 4
    }
});

/*-------------------------------------------------------------------------------------*/
let animationInited = false;

window.addEventListener('scroll', updateScroll);

function updateScroll() {
  let header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("header__scrolled");
  } else {
    header.classList.remove("header__scrolled");
  }

  // Запуск анимации увеличения числа
  let windowBottomPosition = window.scrollY + window.innerHeight;
  let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
  if(windowBottomPosition >= countElementPosition && !animationInited){
    animationInited = true;
    initIncreaseNumberAnimation();
  }
}
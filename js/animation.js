const INCREASE_NUMBER_ANIMATION_SPEED = 50; //константу для задания скорости анимации

/*За анимацию отвечают тут две функции — increaseNumberAnimationStep и initIncreaseNumberAnimation. Первая — за шаг анимации, а вторая инициализирует и запускает ее.*/
function increaseNumberAnimationStep(i, element, endNumber) {
    /*Сперва добавим проверку, что переменная i должна быть меньше либо равна значению endNumber, только в этом случае анимация должна выполняться:*/
    if (i <= endNumber) {
        /*Теперь измените текстовое содержимое в element на значение переменной i. Помните: когда переменная i равна 5000, нужно выводить текст 5000+, для этого добавьте проверку с условием:*/
        if (i === endNumber) {
            element.innerText = i + '+';
        } else {
            element.innerText = i; // i*100 цикл не кончается
            
        }
        //необходимо увеличить значение переменной i
        i += 100; //i++
        setTimeout(function() {
            increaseNumberAnimationStep(i, element, endNumber);
        }, INCREASE_NUMBER_ANIMATION_SPEED); //из примеров решения заданий
    }
    // setTimeout((func, delay) => {
    //     increaseNumberAnimationStep(i, element, endNumber);
    //     //delay = INCREASE_NUMBER_ANIMATION_SPEED;
    // }, 50); //скорость с мсек
    //или
    // setTimeout(increaseNumberAnimationStep, INCREASE_NUMBER_ANIMATION_SPEED, i, element, endNumber);  
} 
  
/*У функции increaseNumberAnimationStep три аргумента:

i — счетчик анимации. Он будет принимать значение от 0 до 5000 и каждый кадр анимации увеличиваться на 1.

element — html-элемент тега с числом. За один кадр анимации значение внутри element мы будем менять на i.

endNumber — значение, когда анимация остановится. В нашем случае — 5000.*/


/*Теперь осталось сделать так, чтобы функция increaseNumberAnimationStep вызывалась каждые 50 мс. Как раз этому равна скорость выполнения анимации, записанная ранее в константу INCREASE_NUMBER_ANIMATION_SPEED.*/
/*В функции increaseNumberAnimationStep вызовите setTimeout. Первым аргументом в setTimeout передайте функцию, которая внутри себя делает вызов increaseNumberAnimationStep с аргументами i, element и endNumber. Второй аргумент delay должен быть равен значению константы INCREASE_NUMBER_ANIMATION_SPEED.*/

function initIncreaseNumberAnimation() {
    const element = document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0, element, 5000);
}
initIncreaseNumberAnimation();
/*В функции initIncreaseNumberAnimation создайте переменную element, она должна быть равна html-элементу тега div с классом features__clients-count. Для получения этого тега можно воспользоваться функцией document.querySelector.
Далее в функции initIncreaseNumberAnimation вызовите функцию increaseNumberAnimationStep с аргументами 0, element, 5000.*/
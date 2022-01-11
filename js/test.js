// const time = 5000;
// const step = 100;

// function outNum(num, elem){
//     let l = document.querySelector("." + elem);
//     n = 0;
//     let t = Math.round(time / (num / step));
//     let interval = setInterval(() => {
//         n = n + step;
//         if(n == num){
//             clearInterval(interval);
//         }
//         l.innerHTML = n + '+';
//     }, t);
// }

// outNum(5000, "features__clients-count");

/*----------------------------------------------------------------------------------------------*/


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
    }
    setTimeout(function() {
        increaseNumberAnimationStep(i, element, endNumber);
    }, INCREASE_NUMBER_ANIMATION_SPEED); //из примеров решения заданий
    // setTimeout((func, delay) => {
    //     increaseNumberAnimationStep(i, element, endNumber);
    // }, INCREASE_NUMBER_ANIMATION_SPEED); //скорость с мсек
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

/*--------------------------------------------------------------------------------------------*/
/*Функция возвращает объект – экземпляр класса HTMLSelectElement, у которого есть метод addEventListener. Первым аргументом этот метод принимает тип события, а вторым — функцию, которая будет вызвана, когда событие произошло*/
/*change, это специальное событие, которое вызывается при выборе новой опции в селекте. */

// document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
//     console.log(event);
// });
//Теперь после выбора Другое в селекте в консоли разработчика увидим объект Event:
/*Объект можно сохранить в консоли, чтобы можно было с ним работать. Для этого нажмите правую кнопку мыши над объектом и выберите опцию Store object as global variable:*/
// В консоли появится новая переменная — temp1 в нашем случае. Давайте посмотрим, что лежит в свойстве temp1.target.value:

// В консоль вывелось искомое: атрибут value выбранного тега option. Следовательно, с его помощью можно будет проверять, какую опцию в селекте выбрал пользователь.

// Итак, если он выбрал опцию Другое, мы должны добавить еще одно текстовое поле. Если пользователь выбрал иную опцию, надо удалить текстовое поле, если оно было добавлено до этого. Распишем эти условия в функции:

/*document.querySelector(#budget').addEventListener('change', function handleSelectChange(event) {
  if (event.target.value === 'other') {
    // Должны добавить еще одно текстовое поле
  }

  if (event.target.value !== 'other') {
    // Удаляем ранее добавленное текстовое поле, если оно есть в DOM
  }
});*/

/*Чтобы добавить новое текстовое поле, надо его создать. Создать новый HTML-элемент можно через document.createElement.*/

/*
Проектное задание 3.1.

Весь последующий код добавьте внутрь блока if с условием event.target.value === 'other'.
С помощью document.createElement создайте элемент div и сохраните его в переменную formContainer.
С помощью свойства classList добавьте элементу formContainer классы form__group и form__other-input (можно воспользоваться методом add у classList).
*/
/*Итак, сейчас мы создали div-элемент с классами form__group и form__other-input. Это эквивалентно следующему HTML-коду:

<div class="form__group form__other-input"></div>
*/

/*Теперь нужно создать текстовое поле, оно будет тегом input.

Проектное задание 3.2

С помощью document.createElement создайте элемент input и сохраните его в переменную input.
У элемента input задайте свойство placeholder, равное Введите ваш вариант.
У элемента input задайте свойство type, равное text.
*/
/*
Отлично, теперь у нас есть переменная formContainer, в которой лежит элемент тега div и переменная input, в которой в свою очередь лежит элемент тега input. Теперь нам нужно input вложить в formContainer, это будет аналогично такому HTML-коду:

<div class="form__group form__other-input">
  <input type="text" placeholder="Введите ваш вариант">
</div>
*/
/*
Проектное задание 3.3

С помощью метода appendChild у formContainer добавьте input в контейнер формы.
*/
/*
А теперь formContainer надо вставить на наш сайт, внутрь тега с формой. HTML-код секции с формой выглядит так:

<section class="form" id="form">
  <div class="form__containter">
    <h1>Оставьте свои контакты</h1>
    <!-- ... -->

    <form>
      <div class="form__group">
        <!-- ... -->
      </div>
      <div class="form__group">
        <label for="budget">Примерный бюджет</label>
        <select id="budget">
          <!-- ... -->
        </select>
      </div>

      <button type="submit" class="form__submit">
        Отправить заявку
      </button>
    </form>
  </div>
</section>
*/
/*
Ранее мы с помощью JavaScript создали тег div с текстовым полем внутри:

<div class="form__group form__other-input">
  <input type="text" placeholder="Введите ваш вариант">
</div>
Это поле надо вставить после тега div с классом form__group, внутри которого находится селект. Иначе говоря, текстовое поле можно вставить перед тегом button. Именно так мы и сделаем, ведь у тега button есть уникальный класс form__submit.
*/
/*
Проектное задание 3.4.

Сперва необходимо из DOM получить тег формы. Это можно сделать с помощью метода querySelector у document, в качестве селектора формы передать #form form (тег form внутри тега с id="form").
Далее у полученного элемента надо воспользоваться методом insertBefore. Первым аргументом передаем formContainer (что вставить), вторым — элемент кнопки, который нужно получить с помощью метода document.querySelector и правильно указанного селектора (перед чем вставить).
*/
/*
При выборе Другое появляется новое текстовое поле, куда можно ввести свое значение. При этом при выборе остальных опций, это поле не исчезает. Надо это поправить.

Для этого надо дописать код для второго блока с условием event.target.value !== 'other'. В нем мы удалим ранее созданный элемент с классом form__other-input.
*/
/*
Проектное задание 3.5.

Весь последующий код добавляйте внутрь блока if с условием event.target.value !== 'other'.
Создайте переменную otherInput, в которой должен храниться элемент с классом form__other-input. Получить этот элемент можно с помощью document.querySelector.
С помощью метода document.querySelector получите тег формы, в качестве селектора формы передайте #form form (тег form внутри тега с id="form"). У полученного элемента воспользуйтесь методом removeChild, передав ему аргументом otherInput. Так, удалим тег с классом form__other-input из тега form.
*/
/*
Проектное задание 3.5.

Весь последующий код добавляйте внутрь блока if с условием event.target.value !== 'other'.
Создайте переменную otherInput, в которой должен храниться элемент с классом form__other-input. Получить этот элемент можно с помощью document.querySelector.
С помощью метода document.querySelector получите тег формы, в качестве селектора формы передайте #form form (тег form внутри тега с id="form"). У полученного элемента воспользуйтесь методом removeChild, передав ему аргументом otherInput. Так, удалим тег с классом form__other-input из тега form.
*/
/*
Прекрасно! Текстовое поле удаляется и добавляется снова. Похоже, все готово? Не совсем. Давайте рассмотрим полученный результат — в консоли разработчика:
*/
/*
Когда мы подряд выбираем опции, которые удаляют тег с текстовым полем, у нас возникает ошибка:

Uncaught TypeError: Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'.

Это случается, потому что при каждом выборе новой опции в селекте мы удаляем текстовое поле, даже если оно уже удалено. Следовательно, чтобы поправить эту ошибку, нужно добавить условие, чтобы мы не удаляли элемент, когда его уже нет на странице.
*/
/*
Проектное задание 3.6.

Вынесите создание переменной otherInput вне блока if, прямо перед ним. Далее для блока if добавьте дополнительное условие: event.target.value !== 'other' && Boolean(otherInput). Условие теперь можно читать так: в селекте выбрали вариант НЕ Другое И элемент с текстовым полем есть на странице.
*/

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



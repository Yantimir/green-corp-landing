/*В методе init нужно инициализировать цвет пузырька одним из случайных цветов. Для этого заведем глобальную переменную с цветами пузырьков, они обозначены в формате RGB:*/
const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];

/*Далее нужно реализовать метод generateBubbles. Он будет создавать массив пузырьков, а количество этих пузырьков вынесем в константу BUBBLE_DENSITY, ее значение будет равно 100*/
const BUBBLE_DENSITY = 50;

/**нужно проинициализировать начальную позицию пузырька, его размер, скорость движения вверх, прозрачность цвета. Тут пригодится хелпер, который будет возвращать случайное число от MIN до MAX*/
function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
}
/*Как видно, он использует функцию Math.random, чтобы получить число в промежутке от left до right, а затем с помощью метода toFixed(2) мы оставляем от числа два знака после запятой.*/

/*-------------------------------------------------------------------------------------------*/
class Bubble {
    /*Начнем с конструктора. Тут все просто: он должен запомнить полученный на входе canvas, проинициализировать им свойство canvas и вызвать методы getCanvasSize и init:*/
    constructor(canvas) {
        this.canvas = canvas;

        this.getCanvasSize();

        this.init();
    }

    /*Метод getCanvasSize будет как раз вытаскивать из холста его размеры и сохранять в переменные внутри класса Bubble*/
    getCanvasSize() {

        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }
    /*свойства canvasWidth и canvasHeight нужны нам для расчета положения точки на холсте. Высоту и ширину html-элемента получим с помощью свойства clientWidth и clientHeight*/

    /*Метод init будет инициализировать пузырек: выбирать ему один из случайных цветов, какой-то размер, начальное положение на холсте*/
    init() {

        /*Проинициализируем свойство color класса в методе init*/
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        /*Проинициализируем свойство size класса (this.size) случайным числом от 1 до 3*/
        this.size = generateDecimalBetween(3, 9);

        /*Проинициализируем свойство alpha класса (this.alpha). Оно должно быть равно случайному числу от 5 до 10, а затем полученное число нужно разделить на 10, так как alpha для цвета обозначает прозрачность, которая принимает значения от 0 до 1.*/
        this.alpha = generateDecimalBetween(5, 10) / 10;

        /*Проинициализируем начальную позицию пузырька, x- и y-координаты. Для этого Проинициализируем свойство translateX случайным числом от 0 до this.canvasWidth и Проинициализируем свойство translateY случайным числом от 0 до this.canvasHeight.*/
        this.translateX = generateDecimalBetween(0, this.canvasWidth);
        this.translateY = generateDecimalBetween(0, this.canvasHeight);

        /*Проинициализируем свойство velocity, в котором будет записано значение скорости*/
        this.velocity = generateDecimalBetween(20, 40);

        /*Проинициализируем дельту перемещения точки по оси x и по оси y. На это число мы будем все время смещать позицию пузырька, таким образом, эти свойства задают скорость и направление движения:*/
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
        /*движение по горизонтали (movementX) может быть от -2 до 2 — пузырьки будут идти не строго вверх, а с небольшим смещением*/
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }
  
    move() {

        /*нужно обновлять x- и y-координаты нашего пузырька на значения movementX и movementY. X- и y-координаты хранятся в свойствах translateX и translateY*/
        this.translateX = this.translateX - this.movementX;
        
        this.translateY = this.translateY - this.movementY;

        /*Сейчас мы будем постоянно уменьшать x- и y-координаты и в какой-то момент можем выйти за границы размеров холста. Нужно обработать эту ситуацию и вернуть их обратно на холст:*/
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }
        /*Как видно из блока кода выше, мы проверяем, что значения опустились ниже 0 в координатах или вышли за горизонтальные границы, и, если это так, заново инициализируем данные*/
    }
}



class CanvasBackground {
    /*у нас есть конструктор и метод start. Конструктор принимает на вход id, это будет id-атрибут тега холста, по которому мы будем получать этот элемент. Метод start запустит анимацию: подстроит размеры холста, создаст пузырьки и анимирует их.*/
    constructor(id) {

        /*проинициализируем свойство canvas html-элементом с id, переданным в аргументе (можно использовать функцию document.getElementById(...)).*/
        this.canvas = document.getElementById(id);

        /*проинициализируем свойство this.ctx 2d-контекстом холста (метод canvas.getContext).*/ 
        this.ctx = this.canvas.getContext("2d");

        /*проинициализируем свойство dpr значением window.devicePixelRatio*/
        this.dpr = window.devicePixelRatio;
    }

    start() {
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }

    /*1. Сначала нужно выставить ширину и высоту холста и настроить масштаб, это мы сделаем в методе canvasSize.*/
    canvasSize(){

        /*нужно выставить ширину для холста (свойство width у canvas). Ширина должна быть равна ширине холста (this.canvas.offsetWidth), умноженной на devicePixelRatio (this.dpr)*/
        this.canvas.width = this.canvas.offsetWidth * this.dpr;

        /*нужно выставить высоту для холста (свойство height у canvas). Высота должна быть равна высоте холста (this.canvas.offsetHeight), умноженной на devicePixelRatio (this.dpr)*/
        this.canvas.height = this.canvas.offsetHeight * this.dpr;

        /*Обратите внимание: ширину и высоту для холста мы выставили, умножив ее на значение devicePixelRatio. Это важно, чтобы потом графика на холсте не отображалась мутно на мониторах с более высоким разрешением — как, например, на retina-дисплеях от Apple*/

        /*Для контекста (this.ctx) выставить масштаб, равный devicePixelRatio (this.dpr) и для оси x, и для оси y (используйте метод ctx.scale(..., ...)).*/
        this.ctx.scale(this.dpr, this.dpr);
    }

    /*2. Далее надо сгенерировать пузырьки, это мы сделаем в методе generateBubbles.*/
    generateBubbles(){
        this.bubblesList= [];

        for (let i = 0; i < BUBBLE_DENSITY; i++) {
            this.bubblesList.push(new Bubble(this.canvas));
        }
    }

    /*3. И последнее — запустить анимацию, для этого вызовем метод animate*/
    animate(){

        /*С помощью метода контекста clearRect очистите весь холст. Метод clearRect принимает на вход координаты левого верхнего угла прямоугольника (0,0) и ширину и высоту прямоугольника. В нашем случае эти величины должны равняться ширине и высоте холста (clientWidth и clientHeight).*/
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        /*Теперь необходимо переместить пузырьки: сначала вычислить их новую позицию, а затем переместить с помощью контекста. */
        this.bubblesList.forEach((bubble) => {
            bubble.move();
            this.ctx.translate(bubble.translateX, bubble.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = "rgba(" + bubble.color + "," + bubble.alpha + ")";
            this.ctx.fill();
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        });
        /*
        1. Вычислим новую позицию пузырька. Для каждого элемента класса Bubble массива this.bubblesList (можно использовать метод forEach массива) нужно вызвать метод move (bubble.move()).
        2. После вызова метода move с помощью метода ctx.translate нужно изменить позицию пузырька на значение (bubble.translateX, bubble.translateY).*/
        /*После метода translate нужно начать отрисовку нового пути пузырька
        1. вызовите метод beginPath контекста.
        2. С помощью метода arc контекста (this.ctx) нарисуйте круг с центром 0,0 и радиусом bubble.size.
        3. Теперь закрасьте круг нужным цветом. Для этого настройте у контекста (this.ctx) свойство fillStyle. Оно должно быть равно строке, которая содержит цвет в формате RGBA, например: "rgba(0,0,0,1)". Цвет должен быть равен цвету пузырька (bubble.color), alpha-значение также должно быть равно свойству alpha у пузырька (bubble.alpha).
        Обратите внимание: bubble.color хранится в формате трех цифр через запятую (например, "255,108,80"), а fillStyle должен быть равен строке в другом формате: "rgba(0,0,0,1)".
        4. Закрасьте пузырек, вызвав метод fill у контекста. 
        5. Чтобы размер пузырька отрисовался согласно размерам холста, учитывающим devicePixelRatio, нужно также учесть его и при отрисовке пузырьков. Для этого вызовите метод this.ctx.setTransform, с помощью которого можно настроить масштабирование. Укажите горизонтальное и вертикальное масштабирование, равное this.dpr, остальные параметры укажите равными 0.*/

        /*запустим анимацию с помощью requestAnimationFrame
        Вызовите метод requestAnimationFrame. На вход нужно передать функцию animate с контекстом, привязанным к текущему классу (this.animate.bind(this))*/
        requestAnimationFrame(this.animate.bind(this));

    }
}

/*нужно создать CanvasBackground и запустить анимацию, вызвав метод start
1. В конце программы создайте экземпляр класса CanvasBackground, указав ему правильный id в качестве аргумента конструктора. 
2. Вызовите метод start у экземпляра класса. */
const canvas = new CanvasBackground("orb-canvas");
canvas.start();
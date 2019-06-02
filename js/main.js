/*
    Массив будет заполнен объектами {color:"", founded:""}
    color - номер цвета
    founded - false если квадрат неразгадан , true если разгадан
*/
var squares = [];
/*
    Массив объектов цветов, используемых в игре {color:"", count:""}
    color - номер цвета, count - количество ячеек с этим цветом
*/
var colors = [];

/*
При активации квадрата в соотвествующую переменную записывается номер выбранного кадрата от 1 до 16.
Если квадрат не выбран, то записываем 100
*/
var indexFirstSquare = 100;
var indexSecondSquare = 100;

//Количество отгаданных цветов
var foundedColors = 0;
//Объект setInterval. Необходим для отсчета игоровго времени
var gameTimer; 

//Храним время начала игры
var startTime;
//Хранит затраченное игровое время 
var spentTime;

//СОздаем обработчик события "click" на игорвом поле
document.getElementById("field").addEventListener("click", function (e){
    
    //проверяем, что нажатие мышью произошло на квадрате с цветом

    if (squares.length == 16 && e.target.attributes.class.nodeValue == "square")
    //если в переменной indexFirstSquare нет значения, то записываем соотвествующий номер ячейки
    if (indexFirstSquare == 100){
        indexFirstSquare = parseInt(e.target.id);
        //если квадрат ранее был разгадан, то сбрасываем indexFirstSquare в начальное значение 100
        if (!squares[indexFirstSquare].found)
            document.getElementById(indexFirstSquare).style.backgroundColor = squares[indexFirstSquare].color;
            else
                indexFirstSquare = 100;
    }  else if (indexFirstSquare < 16) {
        /*
        Если в indexFirstSquare номер квадрата, то при нажатии на следующий квадрат в indexSecondSquare
        то записываем значение текущего выбранного квадрата 
        */
        indexSecondSquare = parseInt(e.target.id);
        //если квадрат ранее был разгадан, то сбрасываем indexSecondSquare в начальное значение 100
        if (!squares[indexSecondSquare].found){
            document.getElementById(indexSecondSquare).style.backgroundColor = squares[indexSecondSquare].color;
            //Проверка, что пользователь не выбрал важды один квадрат
            if (indexFirstSquare != indexSecondSquare && indexFirstSquare < 16 && indexSecondSquare < 16){
                /*
                Если цвета квадратов совпали, то помечаем founded = true и founded увеличиваем на 2
                Если цвета несовпали, то скрываем цвета квадратов
                */
                if (squares[indexFirstSquare].color === squares[indexSecondSquare].color){
                    squares[indexFirstSquare].found = true;
                    squares[indexSecondSquare].found = true;
                    foundedColors+=2;
                    //если разгаданы все цвета, то останавливаем игру
                    if (foundedColors == 16){
                        clearInterval(gameTimer);
                        alert("Вы выиграли!\nЗатраченное время:" + getTimeString(spentTime));
                    }
                }
                    else {
                        setTimeout(whiteSquares, 500, indexFirstSquare,indexSecondSquare);
                        }
                indexFirstSquare = 100;
                indexSecondSquare = 100;
            }
        }
            else 
                indexSecondSquare = 100;
                   
    }
        console.log( " 1 = " + indexFirstSquare + " 2 = " + indexSecondSquare);  
});

function whiteSquares(indexFirstSquare,indexSecondSquare){

    document.getElementById(indexFirstSquare).style.backgroundColor = "white";
    document.getElementById(indexSecondSquare).style.backgroundColor = "white";
}

//Вешаем обработку события onclick на кнопку старт
document.getElementById("start").onclick = function(){
    colors = [
        {color: "red", count: 0}, 
        {color: "green", count: 0}, 
        {color: "blue", count: 0}, 
        {color: "yellow", count: 0}, 
        {color: "magenta", count: 0}, 
        {color: "black", count: 0}, 
        {color: "gray", count: 0}, 
        {color: "brown", count: 0}, 
        ];
    
    //Для каждой ячейки случано выбираем цвет
    for (var i=0; i<16; i++){
        var square = new Object();
        var colorIndex = Math.floor(Math.random()*colors.length);
        
        document.getElementById(i).style.backgroundColor = "white";

        square.color = colors[colorIndex].color;
        colors[colorIndex].count += 1;
        // Если цвет использцется два раза, то удаляем его объект из массива
        if (colors[colorIndex].count >= 2) 
            colors.splice(colorIndex,1);
        square.found = false;
        squares[i] = square;
    }
    //Устанавливаем начальные значения 
    indexFirstSquare = 100;
    indexSecondSquare = 100;
    foundedColors = 0;
    //Запуск таймера игрового времени
    gameTimerCounter = 0;
    startTime = new Date().getTime();
    gameTimer = setInterval(gameTimerFunction, 10);
}
//Функция выводит игровое время на экран
function gameTimerFunction(){
    var nowTime = new Date().getTime();
    spentTime = nowTime - startTime;
    document.getElementById("gameTimer").innerHTML = getTimeString(spentTime);
}
//Функция преобразует время из мс в формат mm:ss:ms
function getTimeString (time) {
    var tmpTime = time;
    var ms = tmpTime % 1000;
    tmpTime = Math.floor(tmpTime/1000);
    var sec = tmpTime % 60;
    var min = Math.floor(tmpTime/60);

    var tmpString;
    tmpString = min < 10 ? "0" + min : min;
    tmpString += sec < 10 ? ":0" + sec : ":" + sec;
    if (ms < 10)
        tmpString += ":00" + ms;
        else if (ms < 100)
            tmpString += ":0" + ms;
                else
                    tmpString += ":" + ms;
    return tmpString;
};
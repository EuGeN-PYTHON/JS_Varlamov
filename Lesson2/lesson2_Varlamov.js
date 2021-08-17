/*
1. Дан код:

var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2
d = b++; alert(d);           // 1
c = (2+ ++a); alert(c);      // 5
d = (2+ b++); alert(d);      // 4
alert(a);                    // 3
alert(b);                    // 3
Почему код даёт именно такие результаты?
*/

// var a = 1, b = 1, c, d;
// c = ++a; console.log(c);           // 2 (Присвоение выполнено после префиксной формы)
// d = b++; console.log(d);           // 1 (Присвоение выполнено до постфиксной формы)
// console.log(a);                    // 2
// console.log(b);                    // 2
// c = (2 + ++a); console.log(c);     // 5 (Присвоение выполнено после префиксной формы) (2 + (2+1)); с = ;
// d = (2 + b++); console.log(d);     // 4 (Присвоение выполнено до постфиксной формы) (2 + 2); d = ; b + 1;
// console.log(a);                    // 3
// console.log(b);                    // 3

/*
2. Чему будет равен x в примере ниже?


var a = 2;
var x = 1 + (a *= 2);
*/


var a = 2;
var x = 1 + (a *= 2); // (1 + (a = a * 2)) ; a = 2
console.log(a)         // 4
console.log(x);       // 5


/*
3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:

если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
*/

function checknum(a, b) {
    if (Number.isInteger(a)){
        alert('Переменная "а" не является целым числом!!!')
        var a = +prompt('Введите любое целое число "a": ')
    } else if (Number.isInteger(b)) {
        alert('Переменная "b" не является целым числом!!!')
        var b = +prompt('Введите любое целое число "b": ')
    } else {
        return a, b 
    }

}

function mathcalc(a,b) {
    // a,b = checknum(a,b)
    if (a >= 0 && b >= 0) { 
        return +a - +b
    } else if (a < 0 && b < 0) {
        return +a * +b
    } else if (a < 0 && b >= 0 || a >= 0 && b < 0) {
        return +a + +b
    } else {
        return 'Введена не корректная информация'
    }    
}

// var a = +prompt('Введите целое число для переменной "а": ')
// var b = +prompt('Введите целое число для переменной "b": ')

// console.log(mathcalc(a, b))


/*
4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/

//С помощью оператора switch

function outnum2(a) {
    switch (a) {
        case 1: console.log('1')
        case 2: console.log('2')
        case 3: console.log('3')
        case 4: console.log('4')
        case 5: console.log('5')
        case 6: console.log('6')
        case 7: console.log('7')
        case 8: console.log('8')
        case 9: console.log('9')
        case 10: console.log('10')
        case 11: console.log('11')
        case 12: console.log('12')
        case 13: console.log('13')
        case 14: console.log('14')
        case 15: console.log('15')
    }
}

outnum2(a)

// Рекурсивный вывод
var a = 9

function outnum(a) {
    if (a === 15) return 15;
    
    return a + ' ' + outnum(a + 1)
}
console.log(outnum(a))





/*
5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/

var a = 210;
var b = 150;

function addition(a, b) {
    return a + b;
}

function difference(a, b) {
    return a - b;
}

function division(a, b) {
    return a / b;
}

function multiplication(a, b) {
    return a * b;
}

/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (использовать switch).
*/

function mathOperation(a, b, operation) {
    switch(operation){
        case 'multiplication': return multiplication(a, b)
        case 'division': return division(a, b)
        case 'difference': return difference(a, b)
        case 'addition': return addition(a, b)
    }
}

/*
7. *Сравнить null и 0. Попробуйте объяснить результат.
*/

console.log(null === 0) // false

// 0 - является значением в отличие от null
// null - указывавет на отсутствие значения, и задается, как правило по умолчанию.

/*
8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.
*/

function power(val, pow) {
    if (+pow === 1) return +val;
    
    return +val * power(val, +pow - 1)
    
}

var val = 2
var pow = 4

console.log(power(val, pow))
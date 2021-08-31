/*
Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999,
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
десятки и сотни. Например, для числа 245 мы должны получить следующий объект:
{‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение
с помощью console.log и вернуть пустой объект.
 */

function getObjNum(val) {
    checkVal(val)
    let numbers = []
    if (val !== 0) {
        for (let i = 0; i < 3; i++) {
            numbers.push(val % 10);
            val = Math.floor(val / 10);
        }
        return `единицы: ${numbers[0]} десятки: ${numbers[1]}, сотни: ${numbers[2]}`
    } else {
        return 'единицы: 0 десятки: 0, сотни: 0'
    }

}


function checkVal(val) {
    while (true) {
        if (Number.isInteger(val)) {
            if (val >= 0 && val < 1000) {
                return val
            }
        } else {
            val = prompt('Введите число от 0 до 999: ')
        }
    }
}
let val = 100
console.log(getObjNum(val))

/*
2.Продолжить работу с интернет-магазином:

2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
2.2. Реализуйте такие объекты.
2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
 */


class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

const basket = {
    bask: [],

    addProd(prod) {
        this.bask.push(prod)
    },



    totalBasketPrice() {
        let totalPrice = 0
        for (let i = 0; i < this.bask.length; i++) {
            totalPrice += this.bask[i].price
        }
        return totalPrice
    }
}

let prod1 = new Product(1, 'banana', 100)
let prod2 = new Product(2, 'apple', 50)

console.log(prod1)

console.log(basket.bask)
console.log(prod1)
basket.addProd(prod1)
basket.addProd(prod2)
basket.addProd(prod1)

console.log(basket.bask)
console.log(basket.totalBasketPrice())

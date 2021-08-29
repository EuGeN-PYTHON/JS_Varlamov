'use strict'

/*
2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:

2.1. Пустая корзина должна выводить строку «Корзина пуста»;

2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
*/


const catalog = {
    cat: [
        {
            id: 1,
            name: 'Банан',
            price: 100,
            count: 1,
        },
        {
            id: 2,
            name: 'Яблоко',
            price: 10,
            count: 1,
        },
        {
            id: 3,
            name: 'Груша',
            price: 20,
            count: 1,
        },
        {
            id: 4,
            name: 'Киви',
            price: 200,
            count: 1,

        },
    ],

    outCat(product) {
        return `<div class="cat">
                    <div><b>ID</b>: ${product.id}</div>
                    <div><b>Наименование</b>: ${product.name}</div>
                    <div><b>Цена за шт.</b>: ${product.price}</div>
                </div>`;
    },

    init() {
        this.cat.forEach(product => {
            document.querySelector('.catalog').insertAdjacentHTML('beforeend', this.outCat(product));
        })
    }
};

const basket = {
    bask: [
        {
            id: 1,
            name: 'Банан',
            price: 400,
            count: 1,
        },
        {
            id: 2,
            name: 'Яблоко',
            price: 10,
            count: 2,
        },
        {
            id: 3,
            name: 'Груша',
            price: 20,
            count: 1,
        },
    ],

    addProd(prod) {
        this.bask.push(prod)
    },

    totalBasketPrice(){
        return this.bask.reduce(function (price, product) {
            return price + product.price * product.count;
        }, 0);
    },

    render() {
        if (this.bask.length) {
            document.querySelector('.bask').insertAdjacentHTML('beforeend', `В корзине ${this.bask.length} позиции(й)(я) стоимостью ${this.totalBasketPrice()}`);
        } else {
            document.querySelector('.bask').textContent = 'Корзина пуста';
        }
    }
};

basket.render()
catalog.init()



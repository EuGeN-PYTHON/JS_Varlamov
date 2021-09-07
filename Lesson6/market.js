
/*
1. Доработать модуль корзины.

a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида

2 *У товара может быть несколько изображений. Нужно:

a. Реализовать функционал показа полноразмерных картинок товара в модальном окне
b. Реализовать функционал перехода между картинками внутри модального окна ("листалка")

 */

class Product {
    constructor(name, price) {
        this.id = this.getID()
        this.name = name
        this.price = price
    }

    getID() {
        let newId = catalog.cat.length + 1
        return newId
    }
}



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
        return `<div class="cat${product.id}">
                <h4><b>${product.name}</b></h4>
                <h4><b>Цена</b>: ${product.price}</h4>
                <button class="btn_add_bask" data-id_prod = ${product.id}>Добавить</button>
<!--                <img src="images/min/${product.id}.jpg" data-full_image_url="images/max/${product.id}.jpg" alt="Картинка${product.id}">-->
                </div>`;
    },

    handEvent() {
        document.querySelector('.catalog').addEventListener('click', event => this.addBask(event))

    },

    addBask(event) {
        if (!event.target.classList.contains('btn_add_bask')) return;
        let id_cat = +event.target.dataset.id_prod;
        let addProd = this.cat.find((prod) => prod.id === id_cat)
        basket.addToBask(addProd)
    },

    init() {
        this.cat.forEach(product => {
            document.querySelector('.catalog').insertAdjacentHTML('beforeend', this.outCat(product));
            const img = new Image();
            img.src = `images/min/${product.id}.jpg`;
            img.setAttribute('data-full_image_url', `images/max/${product.id}.jpg`);
            document.querySelector(`.cat${product.id}`).appendChild(img);
        });
        this.handEvent();
    },

};

const basket = {
    bask: [
        // {
        //     id: 1,
        //     name: 'Банан',
        //     price: 400,
        //     count: 1,
        // },
        // {
        //     id: 2,
        //     name: 'Яблоко',
        //     price: 10,
        //     count: 2,
        // },
        // {
        //     id: 3,
        //     name: 'Груша',
        //     price: 20,
        //     count: 1,
        // },
    ],

    addToBask(prod) {
        const basObj = this.bask.find((item) => prod.id === item.id)
        if (basObj){
            basObj.count ++
        } else {
            this.bask.push(prod);
            this.bask[this.bask.length - 1].count = 1
        }
        this.render()
    },


    totalBasketPrice(){
        return this.bask.reduce(function (price, product) {
            return price + product.price * product.count;
        }, 0);
    },

    initBask() {
        document.querySelector('.bask').innerHTML = '';
        this.bask.forEach(product => {
            document.querySelector('.bask').insertAdjacentHTML('beforeend', this.outBask(product));
        })
    },

    outBask(product) {
        return `<div class="basket">
                <div><b>ID</b>: ${product.id}</div>
                <div><b>Наименование</b>: ${product.name}</div>
                <div><b>Цена за шт.</b>: ${product.price}</div>
                <div><b>Количество в шт.</b>: ${product.count}</div>
                </div>`;
    },

    render() {
        if (this.bask.length) {
            this.initBask();
            document.querySelector('.bask').insertAdjacentHTML('beforeend', `В корзине ${this.bask.length} позиции(й)(я) стоимостью ${this.totalBasketPrice()}`);
        } else {
            document.querySelector('.bask').textContent = 'Корзина пуста';
        }
    },
};

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 * @property {string} settings.openedImageNextBtnSrc Путь до картинки со стрелкой вправо.
 * @property {string} settings.openedImageNextBtnClass Класс картинки со стрелкой вправо.
 * @property {string} settings.openedImageBackBtnSrc Путь до картинки со стрелкой влево.
 * @property {string} settings.openedImageBackBtnClass Класс картинки со стрелкой влево.
 * @property {string} settings.imageNotFoundSrc Путь до стандартной картинки-заглушки.
 */
const gallery = {
    openedImageEl: null,

    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        openedImageNextBtnSrc: 'images/gallery/next.png',
        openedImageNextBtnClass: 'galleryWrapper__next',
        openedImageBackBtnSrc: 'images/gallery/back.png',
        openedImageBackBtnClass: 'galleryWrapper__back',
        imageNotFoundSrc: 'images/gallery/duck.gif',
    },

    /**
     * Инициализирует галерею, ставит обработчик события.
     * @param {Object} settings Объект настроек для галереи.
     */
    init(settings) {
        // Записываем настройки, которые передал пользователь в наши настройки.
        this.settings = Object.assign(this.settings, settings);

        // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
        // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
        // gallery и передадим туда событие MouseEvent, которое случилось.
        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));
    },

    /**
     * Обработчик события клика для открытия картинки.
     * @param {MouseEvent} event Событие клики мышью.
     * @param {HTMLElement} event.target Событие клики мышью.
     */
    containerClickHandler(event) {
        // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
        if (event.target.tagName !== 'IMG') {
            return;
        }

        // Записываем текущую картинку, которую хотим открыть.
        this.openedImageEl = event.target;

        // Открываем картинку.
        this.openImage(event.target.dataset.full_image_url);
    },

    /**
     * Открывает картинку.
     * @param {string} src Ссылка на картинку, которую надо открыть.
     */
    openImage(src) {
        // Пробуем загрузить картинку, если картинка загружена - показываем картинку с полученным из
        // целевого тега (data-full_image_url аттрибут), если картинка не загрузилась - показываем картинку-заглушку.
        // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
        const openedImageEl = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
        const img = new Image();
        img.onload = () => openedImageEl.src = src;
        img.onerror = () => openedImageEl.src = this.settings.imageNotFoundSrc;
        img.src = src;
    },

    /**
     * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
     * @returns {Element}
     */
    getScreenContainer() {
        // Получаем контейнер для открытой картинки.
        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
        // Если контейнер для открытой картинки существует - возвращаем его.
        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        // Возвращаем полученный из метода createScreenContainer контейнер.
        return this.createScreenContainer();
    },

    /**
     * Создает контейнер для открытой картинки.
     * @returns {HTMLElement}
     */
    createScreenContainer() {
        // Создаем сам контейнер-обертку и ставим ему класс.
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        // Добавляем кнопку назад.
        const backBtn = new Image();
        backBtn.classList.add(this.settings.openedImageBackBtnClass);
        backBtn.src = this.settings.openedImageBackBtnSrc;
        galleryWrapperElement.appendChild(backBtn);

        // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
        backBtn.addEventListener('click', () => {
            this.openedImageEl = this.getPrevImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });

        // Добавляем кнопку вперед.
        const nextBtn = new Image();
        nextBtn.classList.add(this.settings.openedImageNextBtnClass);
        nextBtn.src = this.settings.openedImageNextBtnSrc;
        galleryWrapperElement.appendChild(nextBtn);

        // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
        nextBtn.addEventListener('click', () => {
            this.openedImageEl = this.getNextImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        // Добавляем контейнер-обертку в тег body.
        document.body.appendChild(galleryWrapperElement);

        // Возвращаем добавленный в body элемент, наш контейнер-обертку.
        return galleryWrapperElement;
    },

    /**
     * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
     * если текущая открытая картинка последняя.
     * @returns {Element} Следующую картинку от текущей открытой.
     */
    getNextImage() {
        // Получаем элемент справа от текущей открытой картинки.
        const nextSibling = this.openedImageEl.nextElementSibling;
        // Если элемент справа есть, его отдаем, если нет, то берем первый элемент в родительском контейнере.
        return nextSibling ? nextSibling : this.openedImageEl.parentElement.firstElementChild;
    },

    /**
     * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
     * если текущая открытая картинка первая.
     * @returns {Element} Предыдущую картинку от текущей открытой.
     */
    getPrevImage() {
        // Получаем элемент слева от текущей открытой картинки.
        const prevSibling = this.openedImageEl.previousElementSibling;
        // Если элемент слева есть, его отдаем, если нет, то берем последний элемент в родительском контейнере.
        if (prevSibling) {
            return prevSibling;
        } else {
            return this.openedImageEl.parentElement.lastElementChild;
        }
    },

    /**
     * Закрывает (удаляет) контейнер для открытой картинки.
     */
    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.catalog'});

basket.render()
catalog.init()
/*1. Создать функцию, генерирующую шахматную доску.
При этом можно использовать любые html-теги по своему желанию.
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
(использовать createElement / appendChild)
 */
'use strict'
function getChessboard() {
    let letters = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ' '];
    let numbers = [0, 8, 7, 6, 5, 4, 3, 2, 1];
    let tbl = document.createElement('table')
    tbl.id = 'chessboard'
    document.body.appendChild(tbl);
    for (let row = 0; row < 10; row++) {
        let trElem = document.createElement('tr');
        document.getElementById('chessboard').appendChild(trElem);
        for (let col = 0; col < 10; col++) {
            if (row === 0 || row === 9) {
                let tdElem = document.createElement('td');
                tdElem.classList.add('letRow');
                tdElem.innerHTML = letters[col];
                trElem.appendChild(tdElem);
            } else if ((col === 0 || col === 9) && (row !== 0 || row !== 9)) {
                let tdElem = document.createElement('td');
                tdElem.classList.add('numCol');
                tdElem.innerHTML = numbers[row];
                trElem.appendChild(tdElem);
            } else {
                if ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)) {
                    let tdElem = document.createElement('td');
                    tdElem.classList.add('white');
                    trElem.appendChild(tdElem);
                } else {
                    let tdElem = document.createElement('td');
                    tdElem.classList.add('black');
                    trElem.appendChild(tdElem);
                }
            }
        }
    }
}


getChessboard();

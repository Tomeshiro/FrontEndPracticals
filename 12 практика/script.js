"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // Ссылки на внешние ресурсы разного цвета
    const links = document.querySelectorAll('.link');

    links[0].querySelector('a').style.color = 'red';
    links[1].querySelector('a').style.color = 'black';
    links[2].querySelector('a').style.color = 'white';

    // Создание пользовательского списка
    const listBlock = document.querySelector('.create-list');

    const list = document.createElement('ul');
    list.classList.add('user-list');
    list.style = `text-align: left;`;
    listBlock.append(list);

    while (true) {
        let item = prompt("Введите элемент, чтобы добавить его в список.", "");

        if (!item) break;

        let listItem = document.createElement('li');
        listItem.textContent = item;
        list.append(listItem);
    }

    // Появляющееся и исчезающее уведомление
    const notification = document.querySelector('.notif');

    function showNotification(text) {
        let notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = text;
        notif.style = `
        padding: 10px 20px;
        display: inline-block;
        border: 1px solid black;
        background-color: black;
        color: #d35454;
        border-radius: 16px;
        `;

        notification.append(notif);

        setTimeout(() => { notif.remove() }, 1500);
    }

    setInterval(() => { showNotification('Уведомление') }, 2500);



    // Область с картинкой
    const area = document.querySelector(".area");
    const meteor = area.querySelector('img');

    // Центрируем
    meteor.style.top = Math.round(area.clientHeight / 2 - meteor.offsetHeight / 2) + "px";
    meteor.style.left = Math.round(area.clientWidth / 2 - meteor.offsetWidth / 2) + "px";

    // Отображаем координаты
    const clickX = document.querySelector('.clickX').querySelector('span');
    const clickY = document.querySelector('.clickY').querySelector('span');

    area.onclick = function(click) {
        clickX.textContent = click.clientX;
        clickY.textContent = click.clientY;
    }



    // Возможность закрыть уведомления
    const notif = document.querySelector('.notifs');
    const notifBtn = notif.querySelector('.notif__btn');
    const notifInner = notif.querySelector('.notif__inner');
    const notifCounter = notif.querySelector('.notif__counter');
    const notifArr = [
        'Уведомление',
    ];

    let numberNotif = 0;
    let counter = 0;

    //Создаем уведомление
    function createNotif() {
        let element = document.createElement('div');
        element.classList.add('notif__item');

        // Добавляем поочерёдно уведомления из массива, пока не дойдём до конца
        if (numberNotif < notifArr.length) {
            element.textContent = notifArr[numberNotif];
            numberNotif++;
            counter++;
            // Если дошли до конца массива, начинаем выводить массив уведомлений сначала, но счётчик уведомлений сохраняем неизменным
        } else {
            numberNotif = 0;
            element.textContent = notifArr[numberNotif];
            numberNotif++;
            counter++;
        }

        element.style = `
        position: relative;
        padding: 10px 20px;
        display: inline-block;
        border: 1px solid #d35454;
        margin-bottom: 5px;
        background-color: black;
        color: #d35454;
        border-radius: 16px;
        `;

        notifInner.append(element);

        // Добавляем кнопку для закрытия уведомления
        let closeTab = document.createElement('i');
        closeTab.className = 'fa-solid fa-xmark';

        closeTab.style = `
        z-index: 1;
        position: absolute;
        content: "X";
        background-color: #d35454;
        border-radius: 100%;
        color: 'white';
        width: 16px;
        height: 16px;
        right: -4px;
        top: -4px;
        cursor: pointer;
        `;
        element.appendChild(closeTab);

        notifCounter.textContent = counter;

    }

    let timerId = setInterval(createNotif, 3000);

    // Добавляем событие при нажатии кнопки закрытия уведомления
    notifInner.onclick = function(event) {

        let notif = event.target.closest('.notif__item');
        notif.parentNode.removeChild(notif);

        // Уменьшаем счётчик количества уведомлений
        counter--;
        notifCounter.textContent = counter;
    };

});
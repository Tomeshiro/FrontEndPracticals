//Массив с товарами
let mas = [];
let items = document.querySelectorAll('.elem');

for (i = 0; i < items.length; i++)
    mas.push(items[i]);

let replace = document.getElementById('replace');
let rem = document.getElementById('remove');

let buff;

//Замена товаров
replace.onclick = function() {
    num1 = Math.floor(Math.random() * mas.length);
    num2 = Math.floor(Math.random() * mas.length);
    if (num1 == num2) num2 = num2 - 1;
    if (num2 == -1) num2 = mas.length - 1;
        buff = mas[num2].innerHTML;
        mas[num2].innerHTML = mas[num1].innerHTML;
        mas[num1].innerHTML = buff;
};

let f = 0;

//Удаление первого товара
rem.onclick = function() {
    if (f < mas.length) {
    mas[f].parentNode.removeChild(mas[f]);
    }
    f += 1;
}

//Заполнение массива элементами
let filt = [];
let a = document.querySelectorAll('.filt_elm');

for (i = 0; i < a.length; i++)
    filt.push(a[i].innerHTML);

filt = filt.map(item => Number(item));

let sort1 = [];
let b = document.querySelectorAll('.sort_elm');

for (i = 0; i < b.length; i++)
    sort1.push(b[i].innerHTML);

sort1 =sort1.map(item => Number(item));

//Вывод элементов в диапазоне
let filting = document.getElementById('filting');

filting.onclick = function() {
    let min = Number(prompt("Введите нижнюю границу диапазона", "0"));
    let max = Number(prompt("Введите верхнюю границу диапазона", "10000"));

    alert("Производится вывод элементов в диапазоне [" + min + ";" + max + "]");

    //Условие присвоения значений новому массиву, исходя из диапазона
    let new_filt = filt.filter((a) => {
        if (a >= min && a <= max) return true;
        return false;
    });

    let f = document.getElementsByClassName('new_f')

    //Очищаем предыдущие значения поля вывода
    for (j = 0; j < filt.length; j++) {
        f[j].innerHTML = "";
    }

    //Выводим новые значения в поле вывода, входящие в диапазон
    for (j = 0; j < new_filt.length; j++) {
        f[j].innerHTML = new_filt[j];
    }
}


// Сортировка массива по возрастанию
function compareCountsUp(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

// Сортировка массива по убыванию
function compareCountsDown(a, b) {
    if (a > b) return -1;
    if (a == b) return 0;
    if (a < b) return 1;
}

sortUp.onclick = function() {
    sort1.sort(compareCountsUp);
    let f1 = document.getElementsByClassName('sort_elm');
    for (j = 0; j < sort1.length; j++)
        f1[j].innerHTML = sort1[j];
}


sortDown.onclick = function() {
    sort1.sort(compareCountsDown);
    let f1 = document.getElementsByClassName('sort_elm');
    for (j = 0; j < sort1.length; j++)
        f1[j].innerHTML = sort1[j];
}

// Блок с уведомлениями
let num = document.getElementById('number'); // исходное количество уведомлений
let counter = 4;

function notification_plus() {
    counter += 1; // увеличиваем количество уведомлений
    num.innerHTML = counter;

    // Создаём структуру нового уведомления
    let new_li = document.createElement('li');

    let new_span = document.createElement('span');
    new_span.classList.add('icon');

    let new_i = document.createElement('i');
    new_i.classList.add('fa-solid');
    new_i.classList.add('fa-user');

    let new_span1 = document.createElement('span');
    new_span1.classList.add('text');
    new_span1.textContent = "Прошло 3 секунды";

    // Формируем новое уведомление
    new_span.appendChild(new_i);

    new_li.appendChild(new_span);
    new_li.appendChild(new_span1);

    // Добавляем созданное уведомление
    let out_ul = document.getElementById("app");
    out_ul.appendChild(new_li);
}

// Делаем задержку добавления нового уведомления при нажатии на элемент с уведомлениями
notify_box = document.getElementById('not_hover')

notify_box.addEventListener('click', () => {
    clearInterval(notify_plus);
    setTimeout(function() {
        notify_plus = setInterval(notification_plus, 3000);
    }, 10000);
});

let notify_plus = setInterval(notification_plus, 3000);
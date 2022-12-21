//Подтверждение перехода по ссылке
function confirmRedirect(e) {
    let link = e.target;
    //Ищем ближайший родительский элемент, подходящий под указанный CSS селектор
    if (e.target.tagName !== "A")
        link = e.target.closest("A");

    //Заменяем обычный переход браузером по ссылке на необходимый запрос пользователю
    if (link.tagName && !confirm(`Перейти на страницу ${link.host}?`))
        e.preventDefault();
}

//Галерея изображений
function changeMainImage(e) {
    if (e.target.tagName === "IMG") {
        let mainImg = document.getElementById("main_image").getElementsByTagName("img")[0];
        mainImg.src = e.target.src;
    }
}

//Список с выделением как у файлового менеджера
function selectElements(e) {
    //Получаем элементы
    let element = e.target;
    let listElements = document.getElementById("list").getElementsByTagName("li");

    //Если элемент принадлежит тэгу li - выполняем
    if (element.tagName === "LI") {
        //Если нажата клавиша ctrl
        if (e.ctrlKey) {
            if (element.classList.contains("selected"))
                element.classList.remove("selected");
            //Если клавиша ctrl не нажата
            else
                element.classList.add("selected");
            //Если при множественном выделении нажимаем без ctrl
        } else {
            for (let i = 0; i < listElements.length; i++) {
                listElements[i].classList.remove("selected");
            }
            //То снимается выделение со всех предыдущих, и добавляется к текущему
            element.classList.add("selected");
        }
    }
}

//Создание слайдера
let doSlide = false,
    moveDist;
let slider, slideCont, item, clonedItem, totalCost, kart;

onmousedown = function(e) {
    //Если зажали кнопку на слайдере
    if (e.target.id === "slide") {
        doSlide = true;
        slideCont = document.getElementById("slideContainer");
        slider = e.target;
    }
    //Ищем ближайший родительский элемент, подходящий под указанный CSS селектор
    item = e.target.closest(".item");

    //Если зажали кнопку на товаре
    if (item && !item.classList.contains("clone")) {
        placed = false;
        totalCost = document.getElementById("totalCost");
        kart = document.getElementById("kart");

        //Копируем выбранный товар
        clonedItem = item.cloneNode(true);

        //Заменяем стандартное действие при перетаскивании целевого объекта
        clonedItem.ondragstart = function(e) { //срабатывает, когда пользователь начинает перетаскивать элемент
            e.preventDefault();
        }

        //Добавляем перетаскиваемый товар к позиции курсора
        clonedItem.classList.add("clone");
        clonedItem.style.position = "absolute";
        document.body.append(clonedItem);
        moveAt(event.clientX, event.clientY);
    }
}

//Функция для определеня координат перетаскиваемого товара
function moveAt(pageX, pageY) {
    clonedItem.style.left = pageX - clonedItem.offsetWidth / 2 + 'px';
    clonedItem.style.top = pageY - clonedItem.offsetHeight / 2 + 'px';
}

onmousemove = function(e) {
    //Двигаем зажатой мышью на слайдере
    if (doSlide) {
        moveDist = e.clientX - slideCont.getBoundingClientRect().left; //задаём границы
        //Двигаем слайдер относительно передвижения мыши
        if (moveDist > 2 && moveDist <= slideCont.offsetWidth - 10) {
            slider.style.left = moveDist + "px";
        }
    }

    //Обновляем координаты перетаскиваемого товара, относительно позиции курсора
    if (clonedItem && !placed) {
        moveAt(e.pageX, e.pageY);
    }
}

onmouseup = function(e) {
    //Если отжали кнопку со слайдера
    doSlide = false;

    //Если товар ещё не не перенесён в "корзину" и курсор находится не в её области
    if (clonedItem && !placed) {
        //Если курсор находится в области "корзины"
        if (placeable) {
            //Товар перестаёт следовать за курсором
            clonedItem.getElementsByTagName("img")[0].remove();
            clonedItem.classList.remove("item");
            //Добавляем к итоговой стоимости товаров в "корзине" стоимость добавленного туда товара
            totalCost.innerHTML = parseInt(totalCost.innerHTML) + parseInt(clonedItem.getElementsByClassName("cost")[0].innerHTML);
            clonedItem.style.position = "static";
            //Добавляем сам товар в "корзину"
            kart.append(clonedItem);
            placed = true;

            //Если не перетащили товар в "корзину"
        } else
            clonedItem.remove();
    }
}

//"Обнуляем" переменные для Drag-and-drop'а товара
let placeable = false,
    placed = false;


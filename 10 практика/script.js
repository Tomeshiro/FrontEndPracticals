window.onload = function() {
    const randomSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let canvas = document.getElementById('captchaCanvas').getContext('2d');
    let captchaInput = document.getElementById("enterCaptcha");
    let isSumm = false,
        a = 0,
        b = 0;
    let captcha = {
        line: "",
        refresh() {
            this.line = "";
            for (let i = 0; i < 7; i++) {
                this.line += randomSymbols[Math.floor(Math.random() * randomSymbols.length)];
            }
            return this.line;
        }
    }

    function refreshCanvas() {
        captchaInput.value = "";
        captcha.refresh();
        canvas.canvas.width = 150;
        canvas.font = "italic 20pt Arial";
        canvas.fillStyle = "Red";
        canvas.fillText(captcha.line, 0, 30);
    }

    function refreshCanvasSumm() {
        captchaInput.value = "";
        canvas.canvas.width = 150;
        canvas.font = "italic 20pt Arial";
        canvas.fillStyle = "Red";
        a = Math.floor(Math.random() * 1000);
        b = Math.floor(Math.random() * 1000);
        canvas.fillText(a + " + " + b, 0, 30);
    }

    refreshCanvas();
    refresh.onclick = () => refreshCanvas();
    submitCaptcha.onclick = function() {
        if (captchaInput.value === "") {
            alert("Ничего не введено");
            return false;
        }
        if (isSumm) {
            isSumm = false;
            if (Number(captchaInput.value) === (a + b)) {
                alert("Правильно");
                refreshCanvas();
                return true;
            } 
            else {
                alert("Неправильно");
                refreshCanvas();
                return false;
            }
        }
        if (captchaInput.value === captcha.line) {
            alert("Правильно");
            refreshCanvas();
            return true;
        } 
        else {
            alert("Неправильно");
            refreshCanvasSumm();
            isSumm = true;
        }
    }


    let accum = new Accumulator(0);
    let cartItems = document.querySelector('#shoppingCart span');
    let shoppingButtons = document.querySelectorAll('.shoppingElement button');

    function Accumulator(startingValue) {
        this.value = startingValue;

        this.read = () => {
            this.value += Number(prompt("Количество товара", "0"));
        }
    }

    function addToCart() {
        accum.read();
        if (accum.value > 0) cartItems.innerHTML = accum.value;
    }

    for (let i = 0; i < shoppingButtons.length; i++) {
        shoppingButtons[i].onclick = () => addToCart();
    }


    function truncate(str, maxlength) {
        if (str.length > maxlength) {
            str = str.substring(0, maxlength - 3) + "...";
        }
        return str;
    }

    let cards = document.querySelectorAll('.new-card p');
    for (let i = 0; i < cards.length; i++) {
        cards[i].innerHTML = truncate(cards[i].innerHTML, 16);
    }
}
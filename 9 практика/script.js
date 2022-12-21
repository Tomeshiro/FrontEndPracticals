let question = prompt("Желаете зарегистрироваться на сайте?");
if (question == "Да") {
    alert("Круто!");
} else {
    alert("Попробуйте ещё раз")
}


let login = prompt("Введите логин");
if (login=="Админ") {
    let psw = prompt ("Введите пароль");
    if (psw=="Я главный") {
        alert("Здраствуйте!");
    } 
    else if (psw!="" && psw!=null){
        alert("Неверный пароль");
    }
    else {
        alert("Отменено");
    }
}
mode = false;
button = document.querySelector("#likeButton")
button.onclick = function(event){
    if (mode == false){
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
        mode = true;
    } else {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        mode = false;
    }
    }
body = document.querySelector("body")
body.onmousemove = function(event) {
    if (mode == true){
        var x = event.pageX;
        var y = event.pageY;
        var img1=document.createElement('img');
        img1.src='myIcon.png';
        img1.style.position='absolute';
        img1.style.top=y-10 + "px";
        img1.style.left=x+10 + "px";
        document.querySelector("body").appendChild(img1);
        }
    }

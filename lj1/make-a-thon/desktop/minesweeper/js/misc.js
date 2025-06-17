document.getElementById("start-button").addEventListener("mousedown", function () {
    document.getElementById("start-button").style.border = "1px solid gray";
    document.getElementById("popup").style.display = "block";
});
document.getElementById("start-button").addEventListener("mouseup", function () {
    document.getElementById("start-button").style.border = "3px solid black";
});


document.getElementById("subpop1").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subpop1").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});

document.getElementById("subpopmenu1").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subpopmenu1").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});

document.getElementById("subsubpopmenu1").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subsubpopmenu1").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});


document.getElementById("subpop2").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu2").style.display = "block";
});
document.getElementById("subpop2").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu2").style.display = "none";
});

document.getElementById("subpopmenu2").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu2").style.display = "block";
});
document.getElementById("subpopmenu2").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu2").style.display = "none";
});
document.getElementById("subsubpopmenu2").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu1").style.display = "block";
});
document.getElementById("subsubpopmenu2").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu1").style.display = "none";
});


document.getElementById("subpop3").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu3").style.display = "block";
});
document.getElementById("subpop3").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu3").style.display = "none";
});

document.getElementById("subpopmenu3").addEventListener("mouseover", function () {
    document.getElementById("subpopmenu3").style.display = "block";
});
document.getElementById("subpopmenu3").addEventListener("mouseout", function () {
    document.getElementById("subpopmenu3").style.display = "none";
});


document.getElementById("subsubpop1").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu1").style.display = "block";
});
document.getElementById("subsubpop1").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu1").style.display = "none";
});

document.getElementById("subsubpopmenu1").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu1").style.display = "block";
});
document.getElementById("subsubpopmenu1").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu1").style.display = "none";
});


document.getElementById("subsubpop2").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu2").style.display = "block";
});
document.getElementById("subsubpop2").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu2").style.display = "none";
});

document.getElementById("subsubpopmenu2").addEventListener("mouseover", function () {
    document.getElementById("subsubpopmenu2").style.display = "block";
});
document.getElementById("subsubpopmenu2").addEventListener("mouseout", function () {
    document.getElementById("subsubpopmenu2").style.display = "none";
});


document.addEventListener("mouseup", function(event){
    let popup = document.getElementById("popup");
    let startButton = document.getElementById("start-button");
    if (!popup.contains(event.target) && !startButton.contains(event.target) && !document.getElementById("subpopmenu1").contains(event.target) && !document.getElementById("subpopmenu2").contains(event.target) && !document.getElementById("subpopmenu3").contains(event.target) && !document.getElementById("subsubpopmenu1").contains(event.target) && !document.getElementById("subsubpopmenu2").contains(event.target)) {
        popup.style.display = "none";
    }
});

let time = new Date();
let hours = time.getHours();
let minutes = time.getMinutes();

if (hours > 12) {
    hours = hours - 12;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    document.getElementById("time").innerHTML = hours + ":" + minutes + " PM";
}

else {
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    document.getElementById("time").innerHTML = hours + ":" + minutes + " AM";
}

setInterval(() => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (hours > 12) {
        hours = hours - 12;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        document.getElementById("time").innerHTML = hours + ":" + minutes + " PM";
    }

    else {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        document.getElementById("time").innerHTML = hours + ":" + minutes + " AM";
    }
}, 5000);
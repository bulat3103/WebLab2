let y, r;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validate() {
    let check = true;
    if (!validateY()) {
        check = false;
        document.getElementById("y_input").style.borderColor = "#d94343";
    }
    if (!validateR()) {
        check = false;
        document.getElementById("r_input").style.borderColor = "#d94343";
    }
    if (!check) document.getElementById("messageArea").innerHTML = "Некорректные данные";
    return check;
}

function getX() {
    let select = document.getElementById("x_select");
    return select.options[select.selectedIndex].text;
}

function validateY() {
    const Y_MIN = -3;
    const Y_MAX = 5;
    let yField = $('#y_input');
    let numY = yField.val().replace(',', '.');
    if (isNumeric(numY) && numY > Y_MIN && numY < Y_MAX) {
        y = numY;
        return true;
    }
    return false;
}

function validateR() {
    const R_MIN = 2;
    const R_MAX = 5;
    let rField = $('#r_input');
    let numR = rField.val().replace(',', '.');
    if (isNumeric(numR) && numR > R_MIN && numR < R_MAX) {
        r = numR;
        return true;
    }
    return false;
}

function submit() {
    document.getElementById("y_input").style.removeProperty("border-color");
    document.getElementById("r_input").style.removeProperty("border-color");
    document.getElementById("messageArea").innerHTML = "";
    if (validate()) {
        $.get("app", {
            'xVal': getX(),
            'yVal': y,
            'rVal': r,
            'timezone': new Date().getTimezoneOffset()
        }).done(function (data) {
            document.getElementById("scroll").innerHTML = data;
            let hits = document.getElementsByClassName("hit");
            if (hits[hits.length - 1].innerHTML === "true") {
                drawPoint(getX(), y, r, "#22be00");
            } else {
                drawPoint(getX(), y, r, "#ff0000");
            }
        })
    }
}

function clearTable() {
    $.get("app", {
        'clear': true
    }).done(function (data) {
        document.getElementById("scroll").innerHTML = data;
    })
}

function onStart() {
    $.get("app", {
        'start': true
    }).done(function (data) {
        document.getElementById("scroll").innerHTML = data;
    })
}

onStart();
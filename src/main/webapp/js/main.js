let y, r;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validate() {
    let message = "";
    let check = true;
    if (!validateY()) {
        check = false;
        message += "Проверьте правильность ввода Y\n";
    }
    if (!validateR()) {
        check = false;
        message += "Проверьте правильность ввода R";
    }
    if (!check) alert(message);
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
    if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX) {
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
    if (isNumeric(numR) && numR >= R_MIN && numR <= R_MAX) {
        r = numR;
        return true;
    }
    return false;
}

function submit() {
    if (validate()) {
        $.get("app", {
            'xVal': getX(),
            'yVal': y,
            'rVal': r,
            'timezone': new Date().getTimezoneOffset()
        }).done(function (data) {
            document.getElementById("scroll").innerHTML = data;
        })
    }
}

function clearTable() {
    $.get("app", {
        'clearTable': true
    }).done(function (data) {

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
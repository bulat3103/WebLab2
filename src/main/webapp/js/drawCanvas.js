const canvasGraph = document.getElementById('canvas');

canvasGraph.addEventListener('click', function (event) {
    let rVal = document.getElementById('r_input').value;
    if (!validateRadius(rVal)) return;
    let xFromCanvas = (event.offsetX - 125) / 82 * rVal;
    let minDifference = Infinity;
    let nearestXValue;

    for (let i = -3; i <= 5; i++) {
        if (Math.abs(xFromCanvas - i ) < minDifference) {
            minDifference = Math.abs(xFromCanvas - i );
            nearestXValue = i;
        }
    }

    let yFromCanvas = (-event.offsetY + 125) / 82 * rVal;
    if (yFromCanvas <= -3) yFromCanvas = -3;
    else if (yFromCanvas >= 5) yFromCanvas = 5;
    $.get("app", {
        'xVal': nearestXValue,
        'yVal': yFromCanvas,
        'rVal': rVal,
        'timezone': new Date().getTimezoneOffset()
    }).done(function (data) {
        document.getElementById("scroll").innerHTML = data;
    })
    drawPoint(nearestXValue, yFromCanvas, rVal, "#000000");
})

function loadPoints() {
    $.get("app", {
        'loadPoints': true
    }).done(function (data) {
        let obj = JSON.parse(data);
        for (let i = 0; i < obj.points.length; i++) {
            let color = "#ff0000";
            if (obj.points[i].isHit === "true") {
                color = "#22be00";
            }
            drawPoint(obj.points[i].x, obj.points[i].y, obj.points[i].r, color);
        }
    })
}

function drawPoint(xPosition, yPosition, radius, color) {
    yPosition = 125 - 82 * yPosition / radius;
    xPosition = 125 + 82 * xPosition / radius
    const ctx = canvasGraph.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(xPosition, yPosition);
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.arc(xPosition, yPosition, 2.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawCanvas() {
    const ctx = canvasGraph.getContext('2d');
    const canvasGraphWidth = canvasGraph.clientWidth;
    const canvasGraphHeight = canvasGraph.clientHeight;
    const xAxis = canvasGraphWidth / 2;
    const yAxis = canvasGraphHeight / 2;
    const xNameAxis = canvasGraphWidth / 6;
    const yNameAxis = canvasGraphHeight / 6;
    const offsetAxis = 5;

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, canvasGraphHeight);
    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasGraphWidth, yAxis);
    ctx.stroke();
    ctx.closePath();

    let labels = ["R", "R/2", " ", "-R/2", "-R"];
    ctx.font = '15px Arial';
    ctx.fillText("y", xAxis + offsetAxis, offsetAxis * 2);
    ctx.moveTo(xAxis - offsetAxis / 2, offsetAxis);
    ctx.lineTo(xAxis, 0);
    ctx.moveTo(xAxis + offsetAxis / 2, offsetAxis);
    ctx.lineTo(xAxis, 0);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xAxis - offsetAxis / 2, yNameAxis + yNameAxis * i);
        ctx.lineTo(xAxis + offsetAxis / 2, yNameAxis + yNameAxis * i);
        ctx.stroke();
        ctx.fillText(labels[i], xAxis + offsetAxis, yNameAxis + yNameAxis * i + offsetAxis);
    }

    ctx.fillText("x", canvasGraphWidth - offsetAxis * 2, yAxis + 20);
    ctx.moveTo(canvasGraphWidth - offsetAxis, yAxis - offsetAxis / 2);
    ctx.lineTo(canvasGraphWidth, yAxis);
    ctx.moveTo(canvasGraphWidth - offsetAxis, yAxis + offsetAxis / 2);
    ctx.lineTo(canvasGraphWidth, yAxis);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xNameAxis + xNameAxis * i, yAxis - offsetAxis / 2);
        ctx.lineTo(xNameAxis + xNameAxis * i, yAxis + offsetAxis / 2);
        ctx.stroke();
        ctx.fillText(labels[labels.length - i - 1], xNameAxis + xNameAxis * i - offsetAxis, yAxis + 20);
    }

    ctx.fillStyle = "#9933ff";
    ctx.globalAlpha = 0.4;
    ctx.fillRect(xAxis - xNameAxis, yAxis, xNameAxis, 2 * yNameAxis);
    ctx.fillStyle = "#f53737";
    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(xAxis, yAxis - yNameAxis);
    ctx.lineTo(xAxis + 2 * xNameAxis, yAxis);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.fillStyle = "#ef9308";
    ctx.arc(xAxis, yAxis, xAxis - 2 * xNameAxis, Math.PI, Math.PI * 1.5);
    ctx.fill();
    ctx.closePath();
}

drawCanvas();
loadPoints();

function validateRadius(value) {
    const R_MIN = 2;
    const R_MAX = 5;
    let numR = value.replace(',', '.');
    if (isNumeric(numR) && numR > R_MIN && numR < R_MAX) {
        return true;
    }
    return false;
}
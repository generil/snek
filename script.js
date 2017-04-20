var canvas = document.getElementById('tetris'),
    context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

function drawCircle() {
    // clear background
    context.clearRect(0, 0, width, height);

    // background
    context.fillStyle = "#EEEEEE";
    context.fillRect(0, 0, width, height);

    //circle
    context.beginPath();

    var radius = 175;
    context.arc(225, 225, radius, 0, Math.PI * 2, false);
    context.closePath();

    context.fillStyle = "#006699";
    context.fill();
}

drawCircle();

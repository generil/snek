var drawModule = (function() {

    var bodysnek = function(x, y) {
        context.fillStyle = 'green';
        context.fillRect(x * snekSize, y * snekSize, snekSize, snekSize);
        context.strokeStyle = 'darkgreen';
        context.strokeRect(x * snekSize, y * snekSize, snekSize, snekSize);
    }

    var pizza = function(x, y) {
        context.fillStyle = 'yellow';
        context.fillRect(x * snekSize, y * snekSize, snekSize, snekSize);
        context.fillStyle = 'red';
        context.fillRect(x * snekSize + 1, y * snekSize + 1, snekSize - 2, snekSize - 2);
    }

    var scoreText = function() {
        var score_text = "Score: " + score;
        context.fillStyle = 'blue';
        context.fillText(score_text, 145, h - 5);
    }

    var drawsnek = function() {
        var length = 4;
        snek = [];
        for (var i = length - 1; i >= 0; i--) {
            snek.push({
                x: i,
                y: 0
            });
        }
    }

    var paint = function() {
        context.fillStyle = 'lightgrey';
        context.fillRect(0, 0, w, h);
        context.strokeStyle = 'black';
        context.strokeRect(0, 0, w, h);

        btn.setAttribute('disabled', true);

        var snekX = snek[0].x;
        var snekY = snek[0].y;

        if (direction == 'right') {
            snekX++;
        } else if (direction == 'left') {
            snekX--;
        } else if (direction == 'up') {
            snekY--;
        } else if (direction == 'down') {
            snekY++;
        }

        if (snekX == -1 || snekX == w / snekSize || snekY == -1 || snekY == h / snekSize || checkCollision(snekX, snekY, snek)) {
            //restart game
            btn.removeAttribute('disabled', true);

            context.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop);
            return;
        }

        if (snekX == food.x && snekY == food.y) {
            var tail = {
                x: snekX,
                y: snekY
            }; //Create a new head instead of moving the tail
            score++;

            createFood(); //Create new food
        } else {
            var tail = snek.pop(); //pops out the last cell
            tail.x = snekX;
            tail.y = snekY;
        }
        //The snek can now eat the food.
        snek.unshift(tail); //puts back the tail as the first cell

        for (var i = 0; i < snek.length; i++) {
            bodysnek(snek[i].x, snek[i].y);
        }

        pizza(food.x, food.y);
        scoreText();
    }

    var createFood = function() {
        food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        for (var i = 0; i > snek.length; i++) {
            var snekX = snek[i].x;
            var snekY = snek[i].y;

            if (food.x === snekX && food.y === snekY || food.y === snekY && food.x === snekX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var checkCollision = function(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    }

    var init = function() {
        direction = 'down';
        drawsnek();
        createFood();
        gameloop = setInterval(paint, 80);
    }

    return {
        init: init
    };
}());

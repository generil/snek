var drawModule = (function() {

    var bodysnek = function(x, y) {
        context.fillStyle = '#2979FF';
        context.fillRect(x * snekSize, y * snekSize, snekSize, snekSize);
    }

    var pizza = function(x, y) {
        context.fillStyle = '#FF1744';
        context.fillRect(x * snekSize, y * snekSize, snekSize, snekSize);
    }

    var scoreText = function() {
        if (score >= hiscore) {
            hiscore = score;
        }

        var score_text = "SCORE: " + score;
        var hiscore_text = "HISCORE: " + hiscore;
        var txt = document.getElementById('btn');
        txt.innerHTML = score_text;
        var txt = document.getElementsByClassName('title');
        txt[0].innerHTML = hiscore_text;
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
        context.fillStyle = '#FFC107';
        context.fillRect(0, 0, w, h);

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
            document.getElementById('home').style.backgroundImage = 'url(img/angrysnek.jpg)';
            document.getElementById('home').style.backgroundSize = '500px 400px';
            var txt = document.getElementsByClassName('title');
            txt[0].innerHTML = 'HECK YOU!!! 😬';
            var txt = document.getElementById('btn');
            txt.innerHTML = 'PLAY SNEK AGAIN';
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
        score = 0;
    }

    return {
        init: init
    };
}());

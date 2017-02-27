//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("mainCanvas");

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

//set fill color to lello
ctx.fillStyle = "#222";

var requestID;

var clear = function() {
    ctx.clearRect(0, 0, c.width, c.height)
}

var stopIt = function() {
    console.log( requestID );
    window.cancelAnimationFrame( requestID );
};

var circleAnim = function() {
    stopIt();

    var x = c.width / 2;
    var y = c.height / 2;
    var v = 1;
    var r = 1;

    var draw = function() {
        clear();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        requestID = window.requestAnimationFrame(draw);
        if (r > 250 || r == 0) {
            v *= -1;
        }
        r += v;
    }
    draw();
};

var dvdAnim = function() {
    stopIt();

    var dw = new Image();
    dw.src = "jadw.png";

    var vx = Math.random() + 1;
    var vy = Math.random() + 1;

    var h = 100;
    var w =  100;

    //x
    var max_w = c.width - w;
    //y
    var max_h = c.height - h;

    //random pos
    var x = max_w * Math.random();
    var y = max_h * Math.random();

    var draw = function() {
        clear();
        ctx.drawImage(dw, x, y);
        requestID = window.requestAnimationFrame(draw);
        if (x > max_w || x < 0) {
            vx *= -1;
        }
        if (y > max_h || y < 0) {
            vy *= -1;
        }
        x += vx;
        y += vy;
    };
    draw();
};

var circle = document.getElementById("circle");
circle.addEventListener("click", circleAnim);

var dvd = document.getElementById("dvd");
dvd.addEventListener("click", dvdAnim);

//ideally, clicking stop will make the animation stop
var stopButton = document.getElementById( "stop" );
stopButton.addEventListener( "click",  stopIt );

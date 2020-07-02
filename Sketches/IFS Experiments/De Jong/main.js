let a;
let b;
let c;
let d;

let x;
let y;

let cal = 0;
let count = 0;
let colors, chosenColor;
let rows = 4, cols = 4;
let rowWidth, colWidth;
let sketches = new Array(rows * cols);

function setup() {
    createCanvas(800, 800);
    rowWidth = height / rows, colWidth = width / cols;
    console.log(rowWidth);
    console.log(colWidth);
    background(0);
    noStroke();
    colors = [color(random(100, 255), random(100, 110), random(100, 110), 25), color(random(100, 255), random(100, 255), random(100, 200), 25),
        color(random(100, 110), random(100, 110), random(100, 255), 25), color(random(255), random(255), random(255), 25)];
    for(let i = 0; i < rows; ++i)
    {
        for(let j = 0; j < cols; ++j)
        {
            a = 1.4 + random(-0.5, 0.5);
            b = -2.3 + random(-0.5, 0.5);
            c = 2.4 + random(-0.5, 0.5);
            d = -2.1 + random(-0.5, 0.5);   
            sketches[i * rows + j] = new DeJongIFS(a, b, c, d, i, j);
        }
    }   
}

function draw()
{
    for(let i = 0; i < sketches.length; ++i)
        sketches[i].nextIteration();
}

// function generateIFS(a, b, c, d, x, y)
// {
//     return drawIFS(a, b, c, d, x, y);
// }



// function drawIFS(a, b, c, d, x, y) {
//     // stroke(255);
//     // strokeWeight(1);
//     noStroke();
//     if (cal >= 500000)
//         return [0, 0];
//     translate(width / 2, height / 2);
//     for (let i = 0; i < 10000; i++) 
//     {
//         let x_next = sin(a * y) - cos(b * x);
//         let y_next = sin(c * x) - cos(d * y);
//         fill(chosenColor);
//         ellipse(x_next * 50, y_next * 50, 1, 1);
//         x = x_next;
//         y = y_next;
//     }
//     cal += 10000;
//     translate(-width / 2, -height / 2);
//     return [x, y];
// }
let x, y;
let a, b;
function setup()
{
    createCanvas(800, 800);
    x = random(0, width);
    y = random(0, height);
    background(0);
    stroke(255);
    noFill(); 
    a = width / 2;
    b = 0.86 * height;
}

function draw()
{
    for(let i = 0; i < 100; ++i){
        let nextPoints = [[x / 2, y / 2], [x / 2 + a, y / 2 + b], [x / 2 + width, y / 2]];
        point(x, y);
        let next = nextPoints[int(random(0, 3))];
        x = next[0];
        y = next[1];
    }
}
var inc = 0.1;
var scl = 10;
var cols, rows;
var fr;
var zOff = 0;

var particles = [];
var numPartices = 1000;
var flowfield = [];
var dark = true;
let count = 0;
let trees = new Array(3);
let saveButton;


function setup() {
    createCanvas(3500, 5000);
    // noLoop();
    saveButton = createButton('save');
    saveButton.mousePressed(saveImage);
    let x = width / 2 + random(-100, 100);
    for (let i = 0; i < trees.length; ++i)
    {
        // let y = height - random(height / 8, height / 7);
        trees[i] = new Tree(x, Math.floor(random(12, 13)), random(height / 15, height / 10));
    }
    for(let i = 3; i < 6; ++i)
        trees.push(new Tree(random(400, width - 400),Math.floor(random(12, 13)), random(height / 15, height / 10) ));
    background(color('#fffff0'));
    renderBackground();
    renderLand();
    for (let tree of trees) {
        push();
        let y = height - random(height / 9, height / 6.5);
        translate(tree.x, y);
        // translate(tree.x, tree.y);
        strokeWeight(tree.treeHeight / 10);
        tree.branch();
        pop();
    }
    for(var i = 0; i < numPartices; ++i)
        particles[i] = new Particle();
    let scl = 10;
    cols = Math.floor(width / scl);
	rows = Math.floor(height / scl);
    setFlowField();
    noFill();
    strokeWeight(50);
    stroke(0);
    rect(0, 0, width, height);
    strokeWeight(.1);
}


function setFlowField() {
    var yOff = 0;
    for (var y = 0; y < rows; ++y) {
        var xOff = 0;
        for (var x = 0; x < cols; ++x) {
            var r = noise(xOff, yOff, zOff) * PI * 2;
            var v = p5.Vector.fromAngle(r);
            v.setMag(1.2);
            flowfield[x + y * cols] = v;
            xOff += inc;
        }
        yOff += inc;
    }
    zOff += 0.01;

}

function saveImage() {
    save('Japanese Trees.png');
}

function renderLand() {
    // let prevY = height;
    noFill();
    strokeWeight(6);
    for (let i = 0; i < 150; ++i) {
        let prevY = height - i * height / 1000;
        beginShape();
        for (let x = 0; x <= width; x += width / 20) {
            let y = prevY + ((x > width / 2) ? random(0, height / 400) : random(-height / 400, 0));
            vertex(x, y);
            prevY = y;
        }
        endShape();
    }
}
function generateIndex(len) {
    return Math.floor(random(0, len));
}


function drawFlowField()
{
    setFlowField();
    stroke(0);
    for(let particle of particles)
    {
        particle.follow(flowfield);
        particle.update();
        particle.show();
    }
}

function fillTexture(x, y, radius)
{
    let colors = [color('#9a2900'), color('#ff6a34'), color('#b33000'), color('#e6b100')];
    for(let i = 0; i < 20; ++i)
    {
        let c = colors[generateIndex(0, colors.length)];
        for(let j = 0; j < TWO_PI; j += 0.1)
        {
            push();
            translate(x, y);
            rotate(j);
            noFill();
            stroke(c);
            strokeWeight(0.015);
            beginShape();
            for(let k = 0; k < radius; ++k)
                vertex(k * cos(j) + random(-100, 100), k * sin(j) + random(-100, 100));
            endShape();
            pop();
        }
    }
    for(let i = 0; i < 3; ++i)
    {
        let c = color('#ffffff');
        for(let j = 0; j < TWO_PI; j += 0.2)
        {
            push();
            translate(x, y);
            rotate(j);
            noFill();
            stroke(c);
            strokeWeight(0.01);
            beginShape();
            for(let k = 0; k < radius; ++k)
                vertex(k * cos(j) + random(-100, 100), k * sin(j) + random(-100, 100));
            endShape();
            pop();
        }
    }
}

function renderBackground(radius = width / 8) {
    let c = color('#e63e00');
    c.setAlpha(3);
    noStroke();
    fill(c);
    let x = width / 6;
    let y = height / 8;
    for(let i = 0; i < 45; ++i)
    {
        beginShape();
        for(let theta = 0; theta <= TWO_PI; theta += TWO_PI / 100)
            curveVertex(x + random(0.5, 6) * radius * cos(theta), y + random(0.5, 6) * radius * sin(theta));
        endShape();
    }
    c = color('#e63e00');
    fill(c);
    // noStroke();
    ellipse(width / 6, height / 8, radius, radius);
    fillTexture(x, y, radius / 2);
    stroke(0);
}

function draw() {
    setFlowField();
    stroke(20);
    drawFlowField();
    
    // renderBackground();
    noLoop();
} 
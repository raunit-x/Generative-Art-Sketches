let p0, p1, p2, p3;
function setup()
{
    createCanvas(1200, 1200);
    p0 = createVector(30, width / 2);
    p3 = createVector(width - 30, width / 2);
    p2 = createVector(600, 900);
}


function usingPreBuilt()
{
    strokeWeight(24);
    point(30, width / 2);
    point(mouseX, mouseY);
    point(600, 900);
    point(width - 30, width / 2);

    strokeWeight(4);
    noFill();
    beginShape();
    vertex(30, width / 2);

    bezierVertex(mouseX, mouseY, 600, 900, width - 30, width / 2);
    bezierVertex(mouseX, mouseY, 600, 900, 30, width / 2);
    endShape();
    strokeWeight(2);
    line(30, width / 2, mouseX, mouseY);
    line(600, 900, width - 30, width / 2);
}


function quadratic(p0, p1, p2, t)
{
    let p_1 = p5.Vector.lerp(p0, p1, t);
    let p_2 = p5.Vector.lerp(p1, p2, t);
    return p5.Vector.lerp(p_1, p_2, t);
}

function cubic(p0, p1, p2, p3, t)
{
    let v1 = quadratic(p0, p1, p2, t);
    let v2 = quadratic(p1, p2, p3, t);
    return p5.Vector.lerp(v1, v2, t);
}

function fromScratch()
{
    strokeWeight(2);
    p1 = createVector(mouseX, mouseY);
    let delta = 0.01;
    for(let t = 0; t <= 1.0001; t += delta)
    {
        let v = cubic(p0, p1, p2, p3, t);
        // let v = p5.Vector.lerp(v1, v2, t);
        point(v.x, v.y);
    }
}


function draw()
{
    background(0);
    stroke(255);
    fromScratch();
}
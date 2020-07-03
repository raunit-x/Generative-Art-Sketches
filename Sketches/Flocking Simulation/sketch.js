let flock = [];

function setup()
{
    createCanvas(400, 400);
    for(let i = 0; i < 800; ++i)
        flock.push(new Boid());
}

function draw()
{
    background(255);
    for(let boid of flock){
        boid.show();
        boid.update();
    }
}
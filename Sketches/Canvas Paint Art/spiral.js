class Spiral {
    constructor(colorAssigned)
    {
        this.colorAssigned = colorAssigned;
        this.angle = random(0, TWO_PI);
        this.spin = random(0, 1);
        this.growthRate = this.spin * random(45, 46);
        this.r = random(0, 1);
        this.noise = random(2);
        this.history = []; 
    }
    update()
    {
        for(let i = 0; i < 100; ++i)
        {
            this.angle += this.spin / 10;
            this.r += this.growthRate + random(0, this.noise);
            this.history.push(createVector(cos(this.angle) * this.r, sin(this.angle) * this.r));
        }
    }

    show()
    {
        translate(width / 2, height / 2);
        stroke(this.colorAssigned);
        noFill();
        strokeWeight(3);
        beginShape();
        for(let point of this.history)
            vertex(point.x, point.y);
        endShape();
        translate(-width / 2, -height / 2);
    }
}
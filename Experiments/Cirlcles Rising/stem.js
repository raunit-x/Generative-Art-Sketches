class Stem {
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.leftWall = this.x * cellWidth;
        this.rightWall = this.leftWall + cellWidth;
        this.topWall = this.y * cellWidth;
        this.bottomWall = this.topWall + cellWidth;
        this.top = (random(1) < 0.5); 
        this.position = (this.top) ? createVector(this.leftWall + cellWidth / 2 + random(-2, 2), this.topWall + cellWidth / 4) :
         createVector(this.leftWall + cellWidth / 2 + random(-2, 2), this.topWall + 3 * cellWidth / 4);
        this.color = color[Math.floor(random(0, color.length))];
        this.flag = false;
        this.size = 32 / (rows * cols);
    }
    update()
    {
        if(this.flag)
            return;
        if(this.top && this.position.y > this.topWall + cellWidth / 2)
            this.flag = true;
        if(!this.top && this.position.y < this.topWall + cellWidth / 2)
            this.flag = true;
        this.position.x += random(-1, 1);
        this.position.y += (this.top) ? random(2, 4) : random(-4, -2);
    }
    show()
    {
        if(this.flag)
            return;
        stroke(0);
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}
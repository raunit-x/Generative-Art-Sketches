class Trail {
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.leftWall = this.x * cellWidth;
        this.rightWall = this.leftWall + cellWidth;
        this.topWall = this.y * cellWidth;
        this.bottomWall = this.topWall + cellWidth;
        let padding = 20;
        this.flag = (random(0, 1) < 0.5);
        this.directionFlag = (random(0, 1) < 0.5);
        let yPoint = random(this.topWall + padding, this.bottomWall -  padding);
        this.position = createVector(0, yPoint);
        if(this.flag)
        {
            if(this.position.y < (this.topWall + cellWidth / 2))
            {
                // this.position.x = this.leftWall + 10;
                this.position.x = map(this.position.y, this.topWall + padding, this.bottomWall - padding, this.leftWall + 20, this.leftWall + cellWidth / 4);
            }
            else this.position.x = map(this.position.y, this.topWall + padding, this.bottomWall - padding, this.leftWall + cellWidth / 4, this.leftWall + 20);
        }
        else 
        {
            if(this.position.y < (this.topWall + cellWidth / 2))
                this.position.x = map(this.position.y, this.topWall + padding, this.bottomWall - padding, this.rightWall - 20, this.rightWall - cellWidth / 4);
            else this.position.x = map(this.position.y, this.topWall + padding, this.bottomWall - padding, this.rightWall - cellWidth / 4, this.rightWall - 20);
        }
        this.color = color[Math.floor(random(0, color.length))];
        this.size = 48 / (rows * cols);
        this.changed = false;
    }
    update()
    {
        // return;0
        if(this.changed)
            return;
        let center = createVector(this.leftWall + cellWidth / 2, this.topWall + cellWidth / 2);
        let direction = p5.Vector.sub(center, this.position);
        if(this.flag && this.position.x > this.leftWall + cellWidth / 2 - 10)
            direction = undefined;
        if(!this.flag && this.position.x < this.leftWall + cellWidth / 2 + 10)
            direction = undefined;
        let xInc = (this.flag) ? random(1, 2) : random(-2, -1);
        this.position.x += xInc;
        let yInc = (this.directionFlag) ? random(-4, 5) : random(-5, 4);
        if(direction)
            yInc = (xInc * direction.y / direction.x) + random(-2, 2);    
        if(!direction && !this.changed)
        {
            this.changed = true;
        }
        this.position.y += yInc;
    }
    show()
    {
        stroke(0);
        fill(this.color);
        if(!this.changed)
            ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}
class Circle{
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.r = 1;
        this.flag = false;
        this.color = color;
    }
    collisionWithPoint(x, y)
    {
        return dist(this.x, this.y, x, y) < this.r;
    }
    collisionWithOtherCircles(circles)
    {
        let padding = 8;
        for(let c of circles)
        {
            if(c == this)
                continue;
            let d = dist(this.x, this.y, c.x, c.y);
            if(d < this.r + c.r + padding)
            {
                this.flag = true;
                break;
            }
        }
    }
    edges()
    {
        let padding = 40;
        this.flag = this.x + this.r > width - padding || this.x - this.r < padding || this.y + this.r > height - padding || this.y - this.r < padding;
    }
    grow()
    {
        if(this.flag)
            return;
        ++this.r;
    }
    update()
    {
        if(this.flag)
            return;
        this.collisionWithOtherCircles(circles);
        this.grow();
        this.edges();        
    }
    show()
    {
        // stroke(0);
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
    }
}
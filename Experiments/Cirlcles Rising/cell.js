class Cell{
    constructor(x, y, trailColor, stemColor)
    {
        this.x = x;
        this.y = y;
        this.populationSize = 100;
        this.trails = new Array(this.populationSize);
        this.stems = new Array(this.populationSize);
        this.upperX = this.x * cellWidth;
        this.upperY = this.y * cellWidth;
        this.counter = 0;
        // this.leftWall = this.x * cellWidth;
        // this.rightWall = this.leftWall + cellWidth;
        // this.topWall = this.y * cellWidth;
        // this.bottomWall = this.topWall + cellWidth;
        // console.log(this.leftWall, this.topWall, this.rightWall, this.bottomWall);
        for(let i = 0; i < this.trails.length; ++i)
            this.trails[i] = new Trail(x, y, trailColor);
        for(let i = 0; i < this.stems.length; ++i)
            this.stems[i] = new Stem(x, y, stemColor);
    }

    show()
    {
        stroke(150);
        noFill();
        // fill(color(random(100, 200),random(100, 200),random(100, 200),0.1));
        rect(this.upperX, this.upperY, cellWidth, cellWidth);
        for(let trail of this.trails)
            trail.show();
        if(this.counter > 150)
        {
            for(let stem of this.stems)
                stem.show();
        }
    }
    update()
    {
        // stroke(255);
        // noFill();
        // rect(this.upperX, this.upperY, cellWidth, cellWidth);
        for(let trail of this.trails)
            trail.update();
        if(this.counter > 150)
        {
            for(let stem of this.stems)
                stem.update();
        }
        this.counter++;
    }
}
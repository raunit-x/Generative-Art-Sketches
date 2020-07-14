class RectangleCluster{
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.populationSize = Math.floor(map(this.y, 0, height, 12, 6));
        this.rectangles = new Array(this.populationSize);
        // this.size = randomGaussian(width / 30, width / 8);
        this.size = map(this.y, 0, height, width / 50, width / 5);
        for(let i = 0; i < this.populationSize; ++i)
            this.rectangles[i] = {'length': this.size + random(-this.size / 20, this.size / 20), 'angle': random(-TWO_PI, TWO_PI), 'ratio': random(1.2, 1.8)};
        this.color = color;
        // this.color.setAlpha(random(130, 150)); 
        this.color.setAlpha(random(15, 30)); 
    }

    show()
    {
        rectMode(CENTER);
        fill(this.color);
        stroke(0);
        strokeWeight(0.2);
        // strokeWeight(map(this.y, 0, height, 0.5, 0.2));
        // noStroke();
        for(let rectangle of this.rectangles)
        {
            push();
            translate(this.x, this.y) ;
            rotate(rectangle['angle']);
            if(random(0, 1) < 0.5)
                rect(0, 0, rectangle['length'], rectangle['length'] * rectangle['ratio']);
            else ellipse(0, 0, rectangle['length'], rectangle['length'] * rectangle['ratio']);
            pop();
        }
    }

}
class MyNode {
    constructor(index, position)
    {
        this.index = index;
        this.position = position;
        this.radius = 30;
        this.x = horizontalDistance(this.index);
        this.y = verticalDistance(this.position, numNodes[this.index], this.index);
        this.points = new Array(100);
        this.distributePoints();
        if(this.index < layers.length - 1)
        {
            let len = numNodes[this.index + 1];
            this.weights = new Array(len);
            for(let i = 0; i < this.weights.length; ++i)
                this.weights[i] = random(0.5, 1);
        }
    }


    distributePoints()
    {
        for(let i = 0; i < this.points.length; ++i)
        {
            let theta = random(0, TWO_PI);
            this.points[i] = new p5.Vector(this.x + this.radius * cos(theta), this.y + this.radius * sin(theta));
        }
    }

    connectAndShow()
    {
        for(let px of this.points)
        {
            noFill();
            if(!this.index || this.index == layers.length - 1)
                stroke(0, 30);
            else stroke(0, 10);
            ellipse(px.x, px.y, 4, 4);    
            if(this.index == layers.length - 1)
                continue;
            if(count > 0 && !this.index)
                continue;
            for(let j = 0; j < layers[this.index + 1].numOfNodes; ++j)
            {
                for(let p of layers[this.index + 1].nodes[j].points)
                {
                    if(!this.index)
                        stroke(0, 16);
                    else stroke(0, 8);

                    if(random(0, 1) < 0.05)
                    {
                        
                        line(px.x, px.y, p.x, p.y);

                    }
                }
            }
        }
    } 
}
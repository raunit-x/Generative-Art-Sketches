var w;
var h;
var arr = [];
var nums = 50;
var colors = [];


function Grid(i, j)
{
    this.i = i;
    this.j = j;
    this.alive = (random(1) < 0.5);
    this.nextState = false;
    this.aliveTime = 0;
    this.aliveColor = color(150, 150, 0);
    this.deadColor = color(50, 0, 50);
    this.dir = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    this.neighbours = [];
    this.getNeighbours = function()
    {
        for(let index = 0; index < this.dir.length; ++index)
        {
            var x = this.i + this.dir[index][0];
            var y = this.j + this.dir[index][1];
            if(x < 0 || y < 0 || x >= nums || y >= nums)
                continue;
            this.neighbours.push([x, y]);
            console.log(this.neighbours);
        }
    }

    this.nextIteration = function()
    {
        var count = 0;
        for(let i = 0; i < this.neighbours.length; ++i)
            count += arr[this.neighbours[i][0]][this.neighbours[i][1]].alive;
        if(!this.alive && count == 3)
            this.nextState = true;
        else if(this.alive && (count < 2 || count > 3))
            this.nextState = false;
        else this.nextState = this.alive;
    }

    this.update = function()
    {
        // this.nextIteration();
        this.alive = this.nextState;
        this.aliveTime = (this.alive) ? this.aliveTime + 1 : 0;
    }
    this.show = function()
    {
        var col = this.alive ? this.aliveColor : this.deadColor;
        if(this.alive)
            col = colors[this.aliveTime % colors.length];
        fill(col); 
        // noStroke();
        rect(this.i * w, this.j * h, w, h);
    }
}


function setup()
{
    createCanvas(400, 400);
    for(let i = 0; i < 10; ++i)
        colors.push(color(random(255), random(255), random(255)));
    w = width / nums;
    h = height / nums;
    for(let i = 0; i < nums; ++i)
        arr[i] = new Array(nums);
    for(let i = 0; i < nums; ++i)
        for(let j = 0; j < nums; ++j)
            arr[i][j] = new Grid(i, j);
    for(let i = 0; i < nums; ++i)
        for(let j = 0; j < nums; ++j)
            arr[i][j].getNeighbours();
}

function draw()
{
    frameRate(10);
    for(let i = 0; i < nums; ++i)   
        for(let j = 0; j < nums; ++j)
            arr[i][j].nextIteration();
    for(var i = 0; i < nums; ++i)
    {
        for(var j = 0; j < nums; ++j)
        {
            arr[i][j].show();
            arr[i][j].update();
        }
    }

}



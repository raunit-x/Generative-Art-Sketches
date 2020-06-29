let n = 7;
let w, h;
let rows = 20, cols = 20;
let grid = new Array(rows);

function get_colors() {
    let ans = new Array(n);
    for(let i = 0; i < n / 2; ++i)
        ans[i] = ans[n - i - 1] = (random(1) < 0.5) ? color(0, 0, 0, 255) : color(random(0, 250), random(0, 250), random(0, 200), 255);
    return ans;
}

class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colors = new Array(n);
        for(let i = 0; i < n; ++i)
            this.colors[i] = new Array(n);
        for(let i = 0; i < n; ++i)
        {
            let temp = get_colors();
            for(let j = 0; j < n; ++j)
                this.colors[j][i] = temp[j];
        }
        this.cellEdge = w / n;
        }
    render() {
        for(let i = 0; i < n; ++i)
        {
            for(let j = 0; j < n; ++j)
            {
                fill(this.colors[i][j]);
                noStroke();
                rect(this.x * w + this.cellEdge * i, this.y * h + this.cellEdge * j, this.cellEdge, this.cellEdge);
            }
        }
        noFill();
        stroke(0);
        strokeWeight(10);
        rect(this.x * w, this.y * h, w, h);
    }
}
function setup()
{
    console.log(get_colors());
    createCanvas(800, 800);
    background(0);
    w = width / rows;
    h = height / cols;
    for(let i = 0; i < rows; ++i)
    {
        grid[i] = new Array(cols);
        for(let j = 0; j < cols; ++j)
            grid[i][j] = new cell(i, j);
    }
}

function draw() 
{
    for(let i = 0; i < rows; ++i)
        for(let j = 0; j < cols; ++j)
            grid[i][j].render();
    noLoop();
}
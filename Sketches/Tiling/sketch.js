let n = 7;
let w, h;
let rows = 21, cols = 21;
let grid = new Array(rows);

function get_colors() {
    let ans = new Array(n);
    for(let i = 0; i < n / 2; ++i)
        ans[i] = ans[n - i - 1] = (random(1) < 0.5) ? color(0, 0, 0, 255) : color(random(0, 250), random(0, 250), random(0, 200), 255);
    return ans;
}

function setColorZero(cell_object)
{
    for(let i = 0; i < cell_object.colors.length; ++i)
        for(let j = 0; j < cell_object.colors[0].length; ++j)
            cell_object.colors[i][j] = color(0, 0, 0, 255);
}

function setZero()
{
    for(let i = 0; i < grid.length; ++i)
    {
        for(let j = 0; j < grid[0].length; ++j)
        {
            if(random(1) < 0.15)
            {
                setColorZero(grid[i][j]);
            }
        }
    }    
}


function transpose(matrix) {
    for(let i = 0; i < matrix.length; ++i)
    {
        for(let j = i + 1; j < matrix[0].length; ++j)    
        {
            matrix[i][j].x = j;
            matrix[i][j].y = i;
            matrix[j][i].x = i;
            matrix[j][i].y = j;
        }
    }
    setZero();
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
    createCanvas(800, 800);
    background(0);
    w = width / rows;
    h = height / cols;
    for(let i = 0; i < rows; ++i)
    {
        grid[i] = new Array(cols);
        for(let j = 0; j < cols; ++j)
        {
            grid[i][j] = new cell(i, j);
        }
    }
    // to add more level of symmetry and make the whole grid a space invader figure, uncomment the below line
    // for(let i = 0; i < rows; ++i)
    // {
    //     grid[i] = new Array(cols);
    //     for(let j = 0; j < cols / 2; ++j)
    //     {
    //         grid[i][j] = new cell(i, j);
    //         let temp = new cell(i, cols - j - 1);
    //         temp.colors = grid[i][j].colors;
    //         grid[i][cols - j - 1] = temp;
    //     }
    // }
    // transpose(grid);
}

function draw() 
{
    for(let i = 0; i < rows; ++i)
        for(let j = 0; j < cols; ++j)
            grid[i][j].render();
    noLoop();
}

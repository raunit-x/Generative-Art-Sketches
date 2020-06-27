var matrix = [];
var n = 14;
var tempMatrix = [];
var colors = [];
var dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
var count = 0;
var countP;

function setup()
{
    createCanvas(800, 800);
    // countP = new createP('');
    for(let i = 0; i < n; ++i)
        colors.push(color(random(100, 255), random(100, 255), random(100, 255)));
    for(let i = 0; i < height; ++i)
    {
        var row = [];
        for(let j = 0; j < width; ++j)
        {
            row.push(int(random(n)));
            set(j, i, colors[row[row.length - 1]]);
        }
        matrix.push(row);
    }
    updatePixels();
}

function draw()
{
    tempMatrix = cloneMatrix(matrix);
    for(let i = 0; i < height; ++i)
    {
        for(let j = 0; j < width; ++j)
        {
            var nextColor = (matrix[i][j] + 1) % n;
            var flag = false;
            dir.forEach(function(val){
                if(matrix[(val[0] + i + height) % height][(val[1] + j + width) % width] == nextColor)
                    flag = true;
            });
            if(flag)
                tempMatrix[i][j] = nextColor;
            
        }
    }
    matrix = cloneMatrix(tempMatrix);
    setPixelsCustom();
    // countP.html(count);
    // count += 1;
    updatePixels();

}

function setPixelsCustom()
{
    for(let i = 0; i < height; ++i)
        for(let j = 0; j < width; ++j)
            set(j, i, colors[matrix[i][j]]);
}

function cloneMatrix(m) {
    return m.map(function(arr) {
        return arr.slice();
    });
}
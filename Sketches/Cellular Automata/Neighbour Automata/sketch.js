function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < width; i++)
        for (var j = 0; j < height; j++)
            set(i, j, color(random(0, 255), random(0, 255), random(0, 255)));
    updatePixels();
}

function draw() {
    for (let count = 0; count < 1000; ++count) 
    {
        for (var i = 0; i < width; i++) 
        {
            for (var j = 0; j < height; j++)
            {
                var currentColor = get(i, j);
                if (random(['H', 'T']) == 'H')
                 {
                    var r = random(['T', 'R', 'B', 'L']);
                    if (r == 'L')
                        set((i - 1 + width) % width, j, currentColor);
                    else if (r == 'R')
                        set((i + 1) % width, j, currentColor);
                    else if (r == 'B')
                        set(i, (j + 1) % height, currentColor);
                    else if (r == 'T') {
                        set(i, (j - 1 + height) % height, currentColor);
                    }

                }
            }
        }
    }
    updatePixels();
}
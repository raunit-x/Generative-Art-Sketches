class DeJongIFS {
    constructor(a, b, c, d, row, col, x = 0, y = 0, size = 35) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = colors[Math.floor(random(0, 4))];
        this.cal = 1;
        this.row = row;
        this.col = col;
        this.xTranslation = this.col * colWidth + 0.5 * colWidth;
        this.yTranslation = this.row * rowWidth + 0.5 * rowWidth;
    }
    nextIteration()
    {
        stroke(0);
        if(this.cal > 2)
            noFill();
        rect(this.xTranslation - colWidth / 2, this.yTranslation - rowWidth / 2, rowWidth, colWidth);
        noStroke();
        if (this.cal >= 30)
            return;
        translate(this.xTranslation, this.yTranslation);
        for (let i = 0; i < 10000; i++) 
        {
            let x_next = sin(this.a * this.y) - cos(this.b * this.x);
            let y_next = sin(this.c * this.x) - cos(this.d * this.y);
            fill(this.color);
            ellipse(x_next * this.size, y_next * this.size, 1, 1);
            this.x = x_next;
            this.y = y_next;
        }
        this.cal += 1;
        translate(-this.xTranslation, -this.yTranslation);
    }
}
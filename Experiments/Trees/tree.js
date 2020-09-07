class Tree {
    constructor(x, recursionDepth = 10, treeHeight = height / 10) {
        this.x = x;
        // this.y = y;
        this.recursionDepth = recursionDepth;
        this.treeHeight = treeHeight;
        // let alpha = map(this.y, (7 / 8) * height, (6 / 7) * height, 100, 255);
    }

    base()
    {
        
    }

    branch(depth = 0) {
        if (depth < this.recursionDepth) {
            line(0, 0, 0, -this.treeHeight); // draw a line going up
            {
                translate(0, -this.treeHeight);
                rotate(random(-0.65, 0.65));
                if (random(1.0) < 0.6) {
                    rotate(0.3);
                    scale(0.7);

                    push();
                    this.branch(depth + 1);
                    pop();

                    rotate(-0.6);

                    push();
                    this.branch(depth + 1);
                    pop();
                }
                else {
                    this.branch(depth);
                }
            }
        }
    }
}
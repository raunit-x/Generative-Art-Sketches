class RectObject {
    constructor(x, y, edgeSize, idx, flag=false, theta=undefined) {
        this.theta = (theta == undefined) ? random(0, TWO_PI) : theta;
        this.x = x;
        this.y = y;
        this.edgeSize = edgeSize;
        this.idx = idx;
        this.coordinates = [[-this.edgeSize / 2, -this.edgeSize / 2], [-this.edgeSize / 2, 0], [0, 0], [0, -this.edgeSize / 2]];
        this.coordinatesForChildren = [[-this.edgeSize / 4, -this.edgeSize / 4], [this.edgeSize / 4, -this.edgeSize / 4], [-this.edgeSize / 4, this.edgeSize / 4], [this.edgeSize / 4, this.edgeSize / 4]];
        this.children = [];
        if (flag && random(1) < 0.3)
        {
            for (let coordinate of this.coordinatesForChildren)
                this.children.push(new RectObject(this.x + coordinate[0], this.y + coordinate[1], this.edgeSize / 2, generateIndex(0, colorPalettes.length), false, this.theta));
        }
    }

    show() {
        push();
        rectMode(CENTER);
        translate(this.x, this.y);
        let i = 0;
        rotate(this.theta);
        for (let coordinate of this.coordinates) {
            stroke(0);
            strokeWeight(4);
            fill(colorPalettes[this.idx][i++]);
            rect(coordinate[0], coordinate[1], this.edgeSize / 2, this.edgeSize / 2);
        }
        pop();
        for(let child of this.children)
        {
            child.show();
        }
    }
}
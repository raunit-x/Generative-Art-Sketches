class CircleObject {
    constructor(x, y, radius, outerColor, innerColor) {
        this.x = x;
        this.y = y;
        this.outerRadius = radius;
        this.innerRadius = radius - random(0.10, 0.15) * radius;
        this.flag = (random(0, 1) < 0.5);
        this.innerColor = color(innerColor);
        this.outerColor = color(outerColor);
        this.innerColor.setAlpha(200);
        this.outerColor.setAlpha(200);
        if (this.flag) {
            this.thirdColor = color(colorPalettes[generateIndex(0, colorPalettes.length)][generateIndex(0, 4)]);
            this.thirdColor.setAlpha(200);
        }
    }

    fillTexture() {
        // noFill();
        if(this.innerRadius < 50)
            return;
        let r = red(this.innerColor), g = green(this.innerColor), b = blue(this.innerColor);
        let c = color(255 - r, 255 - g, 255 -b);
        // let color = getColors(1, true);
        // this.outerColor.setAlpha(255);
        // while(color == this.outerColor)
        //     color = getColors(1, true);
        // this.outerColor.setAlpha(200);
        // rect(this.x, this.y, 100, 100);
        for (let j = 1; j < 15; j += (j > 5) ? 1 : 0.5) {
            for (let i = 0; i < 10; ++i) {
                strokeWeight(1);
                stroke(c);
                noFill();
                let step = Math.floor(random(50, 100));
                beginShape();
                for (let theta = 0; theta <= TWO_PI; theta += TWO_PI / step) {
                    let r = random(0.6 * this.innerRadius / (j + 1), 0.8 * this.innerRadius / (j + 1));
                    vertex(this.x + random(-20, 20) + r * cos(theta), this.y + random(-20, 20) + r * sin(theta));
                }
                endShape();
            }
        }
    }

    show() {
        fill(this.outerColor);
        ellipse(this.x, this.y, this.outerRadius, this.outerRadius);
        fill(this.innerColor);
        ellipse(this.x, this.y, this.innerRadius, this.innerRadius);
        if (this.flag) {
            fill(this.thirdColor);
            ellipse(this.x, this.y, 0.9 * this.innerRadius, 0.9 * this.innerRadius);
        }
        this.fillTexture();
    }
};
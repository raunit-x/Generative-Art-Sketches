class Court {
    constructor(centerX, centerY, length) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.length = length;
        this.breadth = (36 / 78) * this.length;
        this.alleyWidth = (4.5 / 78) * this.length;
        this.serviceBoxLength = this.length * (21 / 78);
        this.serviceBoxBreadth = this.breadth / 2 - this.alleyWidth;
        this.courtColor = color('#263455');
        this.courtColor.setAlpha(150);
    }

    texture() {
        stroke(color(255, 255, 255, scale * 5));
        strokeWeight(0.5);
        for (let i = 0; i < 50000; ++i) {
            let x1 = random(this.centerX - this.breadth / 2, this.centerX + this.breadth / 2);
            let y1 = random(this.centerY - this.length / 2, this.centerY + this.length / 2);
            let theta = random(TWO_PI);
            let segmentLength = random(scale * 10) + 5 * scale;
            let x2 = cos(theta) * segmentLength + x1;
            let y2 = sin(theta) * segmentLength + y1;
            line(x1, y1, x2, y2);
        }
    }

    renderNet()
    {
        stroke(255);
        strokeWeight(0.2);
        fill(0);
        rectMode(CENTER);
        rect(this.centerX, this.centerY, this.breadth * 11.5 / 10, this.breadth / 90);
        fill(255);
        noStroke();
        ellipse(this.centerX - this.breadth * 11.5 / 20, this.centerY, 2 * scale, 2 * scale);
        ellipse(this.centerX + this.breadth * 11.5 / 20,  this.centerY, 2 * scale, 2 * scale);
        noFill();
        stroke(255);
        strokeWeight(2);
        rect(this.centerX, this.centerY, this.breadth, this.length);
    }

    drawBallTrajectories()
    {
        let ballColor = color('#dcfd50');
        ballColor.setAlpha(40);
        stroke(ballColor);
        strokeWeight(2);
        for(let i = 0; i < 100; ++i) 
        {           
            let startY = this.centerY + this.length / 2 + random(-this.length / 20, this.length / 20);
            let startX = this.centerX + random(-this.breadth / 2 + this.alleyWidth / 2, this.breadth / 2 - this.alleyWidth / 2);
            let endY = this.centerY - this.length / 2 + random(-this.length / 20, this.length / 20);
            let endX = this.centerX + random(-this.breadth / 2 + this.alleyWidth / 2, this.breadth / 2 - this.alleyWidth / 2);
            line(startX, startY, endX, endY);
        }
    }

    renderCourt() {
        // this.texture();
        rectMode(CENTER);
        stroke(255);
        strokeWeight(2);


        // court outline
        fill(this.courtColor);
        // fill(color('#1E407C'));
        rect(this.centerX, this.centerY, this.breadth, this.length);
        noFill();
        // // alley lines
        rect(this.centerX - this.breadth / 2 + this.alleyWidth / 2, this.centerY, this.alleyWidth, this.length);
        rect(this.centerX + this.breadth / 2 - this.alleyWidth / 2, this.centerY, this.alleyWidth, this.length);

        // // service boxes
        rect(this.centerX + this.serviceBoxBreadth / 2, this.centerY + this.serviceBoxLength / 2, this.serviceBoxBreadth, this.serviceBoxLength);
        rect(this.centerX + this.serviceBoxBreadth / 2, this.centerY - this.serviceBoxLength / 2, this.serviceBoxBreadth, this.serviceBoxLength);
        rect(this.centerX - this.serviceBoxBreadth / 2, this.centerY + this.serviceBoxLength / 2, this.serviceBoxBreadth, this.serviceBoxLength);
        rect(this.centerX - this.serviceBoxBreadth / 2, this.centerY - this.serviceBoxLength / 2, this.serviceBoxBreadth, this.serviceBoxLength);

        // base line edge
        fill(255);
        noStroke();
        rect(this.centerX, this.centerY + this.length / 2 - this.length / 200, this.alleyWidth / 15, this.length / 200);
        rect(this.centerX, this.centerY - this.length / 2 + this.length / 200, this.alleyWidth / 15, this.length / 200);

        // net
        stroke(255);
        strokeWeight(0.2);
        fill(0);
        rect(this.centerX, this.centerY, this.breadth * 11.5 / 10, this.breadth / 90);
    }

    show()
    {
        this.renderCourt();
        this.texture();
        // this.drawBallTrajectories();
    }
}
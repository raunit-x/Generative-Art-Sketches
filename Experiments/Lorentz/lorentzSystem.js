class Lorentz {
    constructor(x = 0.01, y = 0, z = 0, dt = 0.01, sigma = 10, rho = 28, beta = 8 / 3)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.sigma = sigma;
        this.rho = rho;
        this.beta = beta;
        this.dt = dt;
        this.points = [];
    }

    update()
    {
        var dx = (this.sigma * (this.y - this.x)) * this.dt;
        var dy = (this.x * (this.rho - this.z) - this.y) * this.dt;
        var dz = (this.x * this.y - this.beta * this.z) * this.dt;
        this.x += dx;
        this.y += dy;
        this.z += dz;
        this.points.push(new p5.Vector(this.x, this.y, this.z));
        console.log(this.points[this.points.length - 1]);
    }

    show()
    {
        // translate(width / 2, height / 2);
        scale(12);
        stroke(0);
        strokeWeight(3);
        point(this.x, this.y, this.z);
        // noFill();
        // scale(7);
        // beginShape();
        // for(let point of this.points)
        //     curveVertex(point.x, point.y, point.z);
        // endShape();
        // translate(-width / 2, -height / 2);
    }


}
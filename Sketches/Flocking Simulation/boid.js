class Boid {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(4, 6));
        // this.acceleration = p5.Vector.random2D();
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 5;
        this.history = [];
        this.color = color(random(100, 255), random(100, 255), random(100, 255), 20);
        this.iterationCount = 200;
        let add;
    }

    edges() {
        let flag = false;
        if (this.position.x > width)
        {
            this.position.x = 0;
            flag = true;
        }
        if (this.position.y > height)
        {
            this.position.y = 0;
            flag = true;
        }
        if (this.position.x < 0)
        {
            this.position.x = width;
            flag = true;
        }
        if (this.position.y < 0)
        {
            this.position.y = height;
            flag = true;
        }
        if(flag)
        {
            // this.history = [];
            this.add = flag;
        }
    }

    update() {
        this.flockBoid(flock);
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
        this.edges();
        if(!this.add)
            this.history.push(this.position.copy());
        this.iterationCount++;
    }

    flockBoid(boids) {
        let cohesion = this.cohesion(boids); 
        let alignment = this.align(boids);
        let separation = this.separation(boids);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }


    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let count = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                ++count;
                steering.add(other.velocity);
            }
        }
        if (count) {
            steering.div(count);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 10;
        let steering = createVector();
        let count = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                ++count;
                steering.add(other.position);
            }
        }
        if (count) {
            steering.div(count);
            steering.sub(this.position);
            steering.setMag(this.maxForce);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 20;
        let steering = createVector();
        let count = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                ++count;
            }
        }
        if (count) {
            steering.div(count);
            steering.setMag(this.maxForce);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    show() {
        strokeWeight(1);
        // translate(width / 2, height / 2);
        // if(this.iterationCount < 200)
            // point(this.position.x, this.position.y);
        noFill();
        stroke(color(20, 20, 20, 20));
        
            beginShape();
            for(let point of this.history)
                vertex(point.x, point.y);
            endShape();
        // translate(-width / 2, -height / 2);
    }
}
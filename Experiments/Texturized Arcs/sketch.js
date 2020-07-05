class Strand {
	constructor(minDistance, color, radius, flag = false, position = undefined) {
		this.radius = radius;
		this.color = color;
		this.minDistance = minDistance;
		this.angle = random(100) * TWO_PI;
		if (!position)
			this.position = createVector(width / 2 + Math.cos(this.angle) * this.radius + random(-20, 20), height / 2 + Math.sin(this.angle) * this.radius + random(-20, 20));
		else {
			this.position = position;
			this.position.x += random(-20, 20);
			this.position.y += random(-20, 20);
		}
		this.mag = 1;
		this.history = [];
		this.minDistance += flag ? random(-15, 15) : random(-2, 2);
		while (dist(width / 2, height / 2, this.position.x, this.position.y) >= this.minDistance + 20) {
			let direction = p5.Vector.sub(createVector(width / 2, height / 2), this.position).heading();
			let velocity = p5.Vector.fromAngle(direction);
			this.history.push(this.position.copy());
			this.position.add(velocity);
			this.position.x += random(-0.5, 0.5);
			this.position.y += random(-0.5, 0.5);
		}
		if (flag) {
			while (dist(width / 2, height / 2, this.position.x, this.position.y) >= this.minDistance - 10) {
				let direction = p5.Vector.sub(createVector(width / 2, height / 2), this.position).heading();
				let velocity = p5.Vector.fromAngle(direction);
				this.history.push(this.position.copy());
				this.position.add(velocity);
				this.position.x += random(-2, 2);
				this.position.y += random(-2, 2);
			}
		}
	}
	show() {
		noFill();
		stroke(this.color);
		beginShape();
		for (let point of this.history)
			vertex(point.x, point.y);
		endShape();

	}
}


function getPoints() {
	points = [];
	for (let strand of outerStrands)
		points.push(strand.position);
	return points;
}

class distortedCircle {
	constructor(radius) {
		this.radius = radius;
		this.points = new Array(100);
		let start = 0;
		for (let i = 0; i < this.points.length; ++i) {
			let angle = start * TWO_PI;
			start += 0.01;
			let position = createVector(width / 2 + Math.cos(angle) * this.radius + random(-0.5, 0.5), height / 2 + Math.sin(angle) * this.radius + random(-0.5, 0.5));
			this.points[i] = position;
		}
		// this.points.sort();
	}

	show() {
		stroke(color(240, 240, 240, 40));
		noFill();
		beginShape();
		for (let p of this.points)
			vertex(p.x, p.y);
		endShape();
	}
}

let radius = 200;
let innerStrands = new Array(2000);
let outerStrands = new Array(2000);


function setup() {
	createCanvas(1000, 660);
	background(0);
	let innerRadius = 300;
	for (let i = 0; i < outerStrands.length; ++i)
		outerStrands[i] = new Strand(innerRadius + 35, color(68, 85, 90, 100), 600, true);
	// points = getPoints();
	for (let i = 0; i < innerStrands.length; ++i) {
		if (random(0, 1) < 0.99)
			innerStrands[i] = new Strand(10, color(240, 240, 240, 40), innerRadius, false);
		else innerStrands[i] = new Strand(10, color(210, 105, 30, 40), innerRadius, false);
	}

}

function draw() {
	// background(0);
	for (let strand of innerStrands) {
		strand.show();
		// strand.update();
	}
	for (let strand of outerStrands) {
		strand.show();
		// strand.update();
	}
	noLoop();
}
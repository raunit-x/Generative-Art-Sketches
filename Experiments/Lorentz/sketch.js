let attractors = new Array();

function setup() {
	createCanvas(1200, 800, WEBGL);
	background(color('#fffff4'));
	for (let i = 0; i < 100; ++i)
		attractors.push(new Lorentz(random(0, .1), random(0, .001), random(0, .001)));
	stroke(0);
	strokeWeight(8);
	noFill();
	rect(-width / 2, - height / 2, width, height);
}

function draw() {
	// background(color('#fffff4'));
	// translate(0, 0, -100);
	// let camX = map(mouseX, 0, width, -200, 200);
	// let camY = map(mouseY, 0, height, -200, 200);
	// camera(0, height, , 0, 0, 0, 0, 1, 0);	
		for (let attractor of attractors) {
			for(let i = 0; i < 1; ++i)
				attractor.update();
			attractor.show();
		}

}
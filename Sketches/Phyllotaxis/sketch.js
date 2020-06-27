var n = 0;
var c = 4;
var r_inc = 1;

function setup()
{
	createCanvas(1200, 780);
	angleMode(DEGREES);
	// colorMode(HSB);
	background(0);
}

function draw()
{
	// var phi1 = n * 120;
	var phi2 = n * 137.3;
	var r = c * sqrt(n++);
	// var x1 = r * cos(phi1) + width / 2;
	// var y1 = r * sin(phi1) + height / 2;
	var x2 = r * cos(phi2) + width / 2;
	var y2 = r * sin(phi2) + height / 2
	// fill(color((phi1 + r) % 256, 255, 255));
	// ellipse(x1, y1, 2 + r_inc, 2 + r_inc);
	fill(color((phi2 * 2 + r) % 256, 255, 255), 100);
	ellipse(x2, y2, 2 + r_inc, 2 + r_inc);
	r_inc += 0.001;
	c += 0.0005;
	if(x2 > width - 10 || y2 > height - 10)
		noLoop();
}
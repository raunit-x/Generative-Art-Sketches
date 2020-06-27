var inc = 0.1;
var scl = 20;
var cols, rows;
var fr;
var zOff = 0;

var particles = [];
var numPartices = 500;
var flowfield = [];
var dark = true;

function setup()
{
	createCanvas(1200, 750);
	pixelDensity(1);
	cols = Math.floor(width / scl);
	rows = Math.floor(height / scl);
	fr = createP('');
	for(var i = 0; i < numPartices; ++i)
		particles[i] = new Particle();
	if(dark)
		background(0);
	else background(255);
}

function toggleTheme()
{
	dark = !dark;
	console.log(dark);
	if(dark)
		background(0);
	else background(255);
	
}

function draw()
{
	stroke(0);
	var yOff = 0;
	for(var y = 0; y < rows; ++y) 
	{
		var xOff = 0;
		for(var x = 0; x < cols; ++x)
		{
			var r = noise(xOff, yOff, zOff) * TWO_PI * 4; 
			var v = p5.Vector.fromAngle(r);
			v.setMag(0.2);
			flowfield[x + y * cols] = v;
			xOff += inc;
		}
		yOff += inc;
	}
	// zOff += inc / 10;
	for(var i = 0; i < numPartices; ++i)
	{
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].show();
	}
	// fr.html(frameRate());
}
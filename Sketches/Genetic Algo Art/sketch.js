var population;
var lifespan = 300;
var lifeP;
var count = 0;
var target;
var maxforce = 1;
var inside = false;
var numberOfhits = 0;
var numberOfhitsP;
var locked = undefined;
var obstacles = [];
var mutationRate = 0.01;
let targets = new Array(4);

// var rx = 100;
// var ry = 150;
// var rw = 200;
// var rh = 10;
class resetButtonFunc {
	constructor() {
		population.reset();
		this.obstacles = [];
	}
}

class Target {
	constructor(x, y) {
		this.pos = createVector(x, y);	
		this.r = 30;
	}
}

function setup() {	

  createCanvas(windowWidth * 0.8, windowHeight);
  for(let i = 0; i < targets.length; ++i)
	targets[i] = new Target(random(100, width - 100), random(0, 100));
  population = new Population();
  lifeP = createP();
  numberOfhitsP = createP();
  target = new Target();
  background(255);
}

function draw() {
  population.run();
//   for(let target of targets)
// 	ellipse(target.pos.x, target.pos.y, 8, 8);
  inside = (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height);
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    numberOfhits = 0;
  }
}





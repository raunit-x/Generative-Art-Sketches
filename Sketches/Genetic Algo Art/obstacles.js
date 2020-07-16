var startPos;
var endPos;
var drawRect = false;

function mousePressed() {
	console.log('PRESSED!');
  	startPos = createVector(mouseX, mouseY);
  	drawRect = true;
  	locked = true;
}

function mouseDragged() {}

function mouseReleased() 
{
	endPos = createVector(mouseX, mouseY);
  	locked = false;
}

function Obstacle() 
{
	this.corner1 = createVector(startPos.x, startPos.y);
	this.corner2 = createVector(endPos.x, endPos.y);
	this.show = function() {
		var w = abs(this.corner2.x - this.corner1.x);
		var h = abs(this.corner2.y - this.corner1.y);
		stroke(0);
		fill(35);
		var corner = createVector((this.corner1.x < this.corner2.x) ? this.corner1.x : this.corner2.x, (this.corner1.y < this.corner2.y) ? this.corner1.y : this.corner2.y);
		this.corner1 = corner;
		this.corner2.x = this.corner1.x + w;
		this.corner2.y = this.corner1.y + h;
		rect(corner.x, corner.y, w, h);
	}
}


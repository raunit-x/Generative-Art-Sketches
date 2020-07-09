
function Particle(myColor)
{
	// this.pos = ( createVector(width - 10, random(height)) : createVector(10, random(height));
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0); // p5.Vector.random2D();
	this.acc = createVector(0, 0);
	this.maxSpeed = 5;
	this.prevPos = this.pos.copy();
	// this.color = color(random(100, 255), random(100, 255), random(100, 255), 50);
	this.color = myColor;
	this.flag = false;
	this.update = function()
	{
		if(this.flag)
			return;
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.acc.mult(0);
		this.flag = this.edges();
	}

	this.edges = function() 
	{
		var flag = false;
		if(this.pos.x < 0)
		{
			flag = true;
			this.pos.x = width;
		}
		if(this.pos.x > width)
		{
			flag = true;
			this.pos.x = 0;
		}
		if(this.pos.y > height)
		{
			flag = true;
			this.pos.y = 0;
		}
		if(this.pos.y < 0)
		{
			flag = true;
			this.pos.y = height;		
		}
		return flag;
	}

	this.applyForce = function(force)
	{
		this.acc.add(force);
	}

	this.follow = function(flowfield)
	{
		var x = Math.floor(this.pos.x / scl);
		var y = Math.floor(this.pos.y / scl);
		var index = x + y * cols;
		var v = flowfield[index];
		this.applyForce(v);
	}

	this.updatePrev = function()
	{
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}
	this.show = function()
	{
		if(this.flag)
			return;
		// if(dark)
		// 	stroke(255, 10);
		// else stroke(0, 10);
		// stroke(this.color);
		// strokeWeight(1);
		// fill(10);
		// stroke(this.color);
		fill(this.color);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 3, 3);
		// point(this.pos.x, this.pos.y);
		this.updatePrev();
		this.updatePrev();
		this.updatePrev();
	}
}
function Rocket(dna) {
  // Physics of rocket at current instance
  this.pos = createVector(width / 2, height - 10);
  this.vel = createVector();
  this.acc = createVector();
  this.color = color(random(50, 250), random(50, 250), random(50, 250));
  // this.color = color(200, 200, 200);
  this.completed = false;
  this.crashed = false;
  this.obstacleCrash = false;
  this.counted = false;
  this.history = [];
  // this.strokeColor = color(random(50, 250), random(50, 250), random(50, 250));
  this.strokeColor = color(random(200, 255), random(100, 255), 0);
  // this.strokeColor = color
  this.dna = (dna) ? dna : new DNA();
  this.fitness = 0;

  this.applyForce = function(force) 
  {
    this.acc.add(force);
  };
  
  this.calcFitness = function() 
  {
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    this.fitness = map(d, 0, width, width, 0);

    if (this.completed)
      this.fitness *= (10 * (4000 / count));
    
    if (this.crashed) 
      this.fitness /= 20;

    if(this.obstacleCrash)
      this.fitness /= 40;
  };

  this.checkCollisions = function() {
    for(var i = 0; i < obstacles.length; ++i)
    {
      if(this.pos.x >= obstacles[i].corner1.x && this.pos.x <= obstacles[i].corner2.x && this.pos.y >= obstacles[i].corner1.y && this.pos.y <= obstacles[i].corner2.y)
      {
        this.obstacleCrash = true;
        break;
      }
    }
  }
  // Updates state of rocket
  this.update = function() {
    
    var d = width;
    for(let target of targets)
    {
      let dis = dist(target.pos.x, target.pos.y, this.pos.x, this.pos.y);
      if(dis < d)
        d = dis;
    }
    if (d < 30) 
    {
      this.completed = true;
      if(!this.counted)
      {
        numberOfhits++;
        this.counted = true;
      }
    }
    this.checkCollisions();
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height) 
      this.crashed = true;
    

    this.history.push(createVector(this.pos.x, this.pos.y));
    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed && !this.obstacleCrash) 
    {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    // else this.history = [];
  };
  // displays rocket to window
  this.show = function() {
    if(count != lifespan - 10)
      return;
    noFill();
    // this.strokeColor.setAlpha(20);
    stroke(80, 20);
    strokeWeight(1);
    // stroke(this.strokeColor);
    beginShape();
    for(let p of this.history)
      curveVertex(p.x, p.y);
    endShape();
    // point(this.pos.x, this.pos.y);
  };
}
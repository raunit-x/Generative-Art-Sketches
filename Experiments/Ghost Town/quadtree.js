class Point{
    constructor(x, y)
    {
      this.x = x;
      this.y = y;
    }
  }
  
  class Rectangle {
    constructor(x, y, w, h)
    {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    contains(point)
    {
        let topLeft = new Point(this.x - this.w, this.y - this.h);
        let bottomRight = new Point(this.x + this.w, this.y + this.h);
        return topLeft.x <= point.x && point.x <= bottomRight.x && topLeft.y <= point.y && point.y <= bottomRight.y;
    }
  }
  
  class QuadTree {
    constructor(boundary, n)
    {
      this.boundary = boundary;
      this.capacity = n;
      this.points = [];
      this.divided = false;
      this.children = [];
    }

    subdivide()
    {
        if(this.divided)
            return;
        let nw = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2)
        let northwest = new QuadTree(nw, this.capacity);
        let ne = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2)
        let northeast = new QuadTree(ne, this.capacity);
        let sw = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2)
        let southwest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2)
        let southeast = new QuadTree(se, this.capacity);
        this.children = [northwest, northeast, southeast, southwest];
    }

    insert(p)
    {
        if(!this.boundary.contains(p))
        {
            return;
        }
        
        if(this.points.length < this.capacity)
        {
            this.points.push(p);
            return;
        }
        this.subdivide();
        this.divided = true;
        for(let i = 0; i < this.children.length; ++i)
            this.children[i].insert(p);
    }

    show()
    {
        stroke(255);
        noFill();
        strokeWeight(1);
        rect(this.boundary.x - this.boundary.w, this.boundary.y - this.boundary.h, this.boundary.w * 2, this.boundary.h * 2);
        for(let i = 0; i < this.children.length; ++i)
            this.children[i].show();
        // strokeWeight(2);
        // for(let p of this.points)
        //     point(p.x, p.y);
    }
  }
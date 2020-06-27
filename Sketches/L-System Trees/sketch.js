// variables: A B
// axiom: A
// rules: (A → AB), (B → A)
var angle;
var axiom = 'F';
var len = 100;
var sentence = axiom;
var weight = 12;
var numTrees = 20;
var forest = [];

var rules = [];
rules[0] = {
    a: 'F',
    b: 'FF+[+F-F-F]-[-F+F+F]'
};

function generate() {
    
    // len *= 0.6;
    weight *= 0.5;
    strokeWeight(weight);
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        var found = false;
        for (var j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                nextSentence += rules[j].b;
                break;
            }
        }
        if (!found)
            nextSentence += current;
    }
    sentence = nextSentence;
    // createP(sentence);
    renderStars();
    turtle();
}

function turtle() {
    // background(color(2, 0, 10));
    for (var index = 0; index < forest.length; ++index) {
        resetMatrix();
        forest[index].length *= 0.7;
        translate(forest[index].position[0], forest[index].position[1]);
        stroke(forest[index].color, forest[index].alpha);
        strokeWeight(weight);
        for (var i = 0; i < sentence.length; i++) {
            var current = sentence.charAt(i);
            if (current == 'F') {
                // line(0, 0, 0, -len);
                // translate(0, -len);
                // console.log(forest[index].length);
                line(0, 0, 0, -forest[index].length);
                translate(0, -forest[index].length);
            } else if (current == '+') {
                rotate(radians(random(20, 25)));
            } else if (current == '-') {
                rotate(-radians(random(20, 25)));
            } else if (current == '[') {
                push();
            } else if (current == ']') {
                pop();
            }
        }
    }
}

function setup() {
    createCanvas(1400, 750);
    background(0);
    createP(axiom);
    for(var i = 0; i < numTrees; ++i)
    {
        var h = height - random(height / 3);
        forest.push({
            length: map(h, 0.66 * height, height, 10, 70), 
            color: color(random(150), random(0, 100), random(100), map(h, 0.66 * height, height, 150, 250)), 
            position: [random(1) * (width - 200) + 100, h],
        });
    }
    forest.sort(function(a, b){
        return -(a.height - b.height);
    })
    console.log(forest);
    turtle();
    var button = createButton('generate');
    button.mousePressed(generate);
}

function renderStars()
{
    var stars = 100;
    for(var i = 0; i < stars; ++i)
    {
        push();
        resetMatrix();
        noStroke();
        fill(random(200, 250), random(40, 120));
        var r = random(2, 4);
        ellipse(random(width), random(height), r, r);
        pop();
    }
}

function draw()
{
    
}

// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 24;

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

function setup() 
{

    var canvasBackground = createCanvas(windowWidth, windowHeight);
    canvasBackground.style('z-index', '-1');
    canvasBackground.position(0, 0);
    angleMode(DEGREES);
    background(255);
}

function keyPressed() 
{
    if (keyCode == ENTER)
        background(255);
    if (key == 's')
        save('myCanvas.jpg');
    
}
function draw() {
    translate(width / 2, height / 2);
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) 
    {

        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;
        if (mouseIsPressed) 
        {
            for (let i = 0; i < symmetry; i++) 
            {
                rotate(angle);
                let sw = 2;
                strokeWeight(sw);
                stroke(100, 100);
                line(mx, my, pmx, pmy);
                push();
                scale(1, -1);
                line(mx, my, pmx, pmy);
                pop();
            }
        }
    }
}

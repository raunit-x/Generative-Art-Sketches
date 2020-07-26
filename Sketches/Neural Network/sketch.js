let leftPadding = 100;
let topPadding = 50;
let numNodes = [7, 3, 5, 5, 3, 5, 1];
let count = 0;
let layers = new Array(numNodes.length);


function horizontalDistance(i, num = numNodes.length)
{
	// return width / 2 + (i - Math.floor(num / 2)) * ((width - 2 * leftPadding) / numNodes.length);
	return random(leftPadding, width - leftPadding);
}

function verticalDistance(i, num, index)
{
	// return height / 2 + (i - Math.floor(num / 2)) * ((height - 2 * topPadding) / numNodes[index]);
	return random(topPadding, height - topPadding);
}

function setup() {
	createCanvas(3000, 2000);
	background(color('#fffff5'));
	// background(0);
	strokeWeight(16);
	// stroke(255);
	noFill();
	rect(0, 0, width, height);
	strokeWeight(1);
	for(let i = 0; i < layers.length; ++i)
		layers[i] = new Layer(i, numNodes[i]);
}

function draw() {
	for(let layer of layers)
		layer.show();
	if(count++ > 0)
	{
		save('NN.png');
		noLoop();
	}
}
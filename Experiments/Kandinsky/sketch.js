let colorPalettes;
let colorObjectsCount = 30;
let colorObjects = new Array(colorObjectsCount);
let rectObjects = new Array(Math.floor(colorObjectsCount / 3));
// let rectObjects = new Array(1);
let saveButton;

function generateIndex(start, end) {
	return Math.floor(random(start, end));
}

function getColors(len, flag = false) {
	let idx = generateIndex(0, colorPalettes.length);
	let ans = [];
	count = 0;
	for (let i = 0; i < len; ++i) {
		ans.push(colorPalettes[idx][generateIndex(0, colorPalettes[idx].length)]);
		if (flag)
			ans[ans.length - 1] = color(ans[ans.length - 1]);
	}
	return ans;
}

function drawLines()
{
	for(let i = 0; i < 8; ++i)
	{
		let idx1 = generateIndex(0, colorObjectsCount);
		let idx2 = generateIndex(0, colorObjectsCount);
		if(dist(colorObjects[idx1].x, colorObjects[idx1].y, colorObjects[idx2].x, colorObjects[idx2].y) < (colorObjects[idx1].outerRadius + colorObjects[idx2].outerRadius) / 8)
			return;
		stroke(0);
		strokeWeight(10);
		line(colorObjects[idx1].x + random(-100, 100), colorObjects[idx1].y + random(-100, 100), colorObjects[idx2].x + random(-100, 100), colorObjects[idx2].y + random(-100, 100));
	}
	
}

function renderBackground() {
	let bgColors = [color('#071330'), color('#071330'), color('#071330'), color('#0C4160'), color('#000000'), color('#738FA7'), color('#C3CEDA')];
	noStroke();
	// strokeWeight(0.1);
	for(let i = 0; i < 100; ++i)
	{
		let r = random(width / 3);
		let step = Math.floor(random(100, 200));
		beginShape();
		let idx = generateIndex(5, 7);
		bgColors[idx].setAlpha(10);	
		let x = width / 2 + random(-width / 6, width / 6);
		let y = height / 2 + random(-height / 6, height / 6);
		fill(bgColors[idx]);
		for(let theta = 0; theta <= TWO_PI; theta += TWO_PI / 1000)
			curveVertex(x + random(1.2 * r, 1.3 * r) * cos(theta), y + random(1.2 * r, 1.3 * r) * sin(theta));
		endShape();
		beginShape();
		idx = generateIndex(0, 3);
		bgColors[idx].setAlpha(10);	
		fill(bgColors[idx]);
		for(let theta = 0; theta <= TWO_PI; theta += TWO_PI / step)
			curveVertex(x + random(r, 1.2 * r) * cos(theta), y + random(r, 1.2 * r) * sin(theta));
		endShape();
		beginShape();
		idx = generateIndex(0, 2);
		bgColors[idx].setAlpha(10);	
		fill(bgColors[idx]);
		for(let theta = 0; theta <= TWO_PI; theta += TWO_PI / step)
			curveVertex(x + random(r, 1.2 * r) * cos(theta), y + random(r, 1.2 * r) * sin(theta));
		endShape();
		
	}
	
}

function saveImage()
{
	save('kindanski.png');
}

function setup() {
	createCanvas(1200, 700);
	background(0);
	renderBackground();
	saveButton = createButton('save');
	saveButton.mousePressed(saveImage);
	colorPalettes = [
		["#ffffff", "#d0e1f9", "#4d648d", "#283655", "#1e1f26"],
		['#4b3832', '#854442', '#fff4e6', '#3c2f2f', '#be9b7b'],
		['#051e3e', '#251e3e', '#451e3e', '#651e3e', '#851e3e'],
		['#5D577A', '#A19EB1', '#7A7693', '#453F64', '#2D274F'],
		['#333652', '#FAD02C', '#E9EAEC', '#90ADC6'],
		['#1B2E3C', '#0C0C1E', '#74112F', '#F3E3E2']
	];
	for(let i = 0; i < rectObjects.length; ++i)
		rectObjects[i] = new RectObject(random(100, width - 100), random(100, height - 100), randomGaussian(width / 24, width / 24), generateIndex(0, colorPalettes.length));
	for (let i = 0; i < colorObjectsCount; ++i) {
		let x = random(100, width - 100);
		let y = random(100, height - 100);
		let colors = getColors(2);
		while (colors[0] == colors[1])
			colors = getColors(2);
		colorObjects[i] = new CircleObject(x, y, randomGaussian(width / 6, width / 12), colors[0], colors[1]);
	}
	for(let obj of colorObjects)
		obj.show();
	for(let obj of rectObjects)
		obj.show();
	drawLines();

}

function draw() {

}
let tennisCourts = new Array(4);
let scale = 4;
let saveButton;
let colorPalettes;

function fillTexture() {
	stroke(color(255, 255, 255, scale * 5));
	// strokeWeight(1);
	for (let i = 0; i < scale * 50000; ++i) {
		let x1 = random(width);
		let y1 = random(height);
		let theta = random(TWO_PI);
		let segmentLength = random(scale * 10) + scale * 5;
		let x2 = cos(theta) * segmentLength + x1;
		let y2 = sin(theta) * segmentLength + y1;
		line(x1, y1, x2, y2);
	}
}

function saveFn()
{
	save('tennisCourt.png');
}



function setup() {
	createCanvas(1600 * scale, 800 * scale);
	saveButton = createButton('save');
	saveButton.mousePressed(saveFn);
	colorPalettes = [
		[color('#324851'), color('#86AC41'), color('#34675C'), color('#7DA3A1')],
		[color('#021C1E'), color('#004445'), color('#2C7873'), color('#6FB98F')],
		[color('#003B46'), color('#07575B'), color('#66A5AD'), color('#C4DFE6')],
		[color('#46211A'), color('#693D3D'), color('#BA5536'), color('#A43280')],
		[color('#4C3F54'), color('#D13525'), color('#F2C057'), color('#486824')],
		[color('#EAE2D6'), color('#D5C3AA'), color('#867666'), color('#E1B80D')],
		[color('#301B28'), color('#523634'), color('#B6452C'), color('#DDC5A2')],
		[color('#90AFC5'), color('#336B87'), color('#2A3132'), color('#763626')],
		[color('#011A27'), color('#063852'), color('#F0810F'), color('#E6DF44')],
		[color('#1E1F26'), color('#283655'), color('#4D648D'), color('#D0E1F9')],
		[color('#217CA3'), color('#E29930'), color('#32384D'), color('#211F30')]
	];	

	for(let i = 0; i < tennisCourts.length; ++i)
		tennisCourts[i] = new Court((2 * i + 1) * width / (tennisCourts.length * 2), height / 2, 5 * height / 6);
	// background(color('#2b527d'));
	background(color('#436185'));
	fillTexture();
}



function design()
{
	fill(colorPalettes[Math.floor(random(11))][Math.floor(random(4))]);
	noStroke();
	beginShape();
	curveVertex(0, 0);
	let y = random(height / 2);
	let r = Math.floor(random(3, 7));
	curveVertex(width - width / r, y);
	let x = width;
	for(let i = 0; i < r + 1; ++i)
	{
		y = random(y, height);
		curveVertex(x, random(height));
		x -= width / r;
	}
	curveVertex(0, 0);
	endShape();
}

function renderBackground()
{
	rectMode(CORNERS);
	fill(color('#263455'));
	rect(0, 0, width, height / 12 - 1);
	rect(0, 11 * height / 12 + 1, width, height);
	let curr = 0;	
	for(let court of tennisCourts)
	{
		rect(curr, height / 12 - 1, court.centerX - court.breadth / 2, 11 * height / 12 + 1);
		curr = court.centerX + court.breadth / 2;
	}
	rect(curr, height / 12 - 1, width, 11 * height / 12 + 1);
	fillTexture();
}


function draw() 
{
	for(let i = 0; i < 45; ++i)
		design();
	for(let court of tennisCourts)
		court.show();
	fillTexture();
	renderBackground();
	fillTexture();
	for(let court of tennisCourts)
		court.renderNet();
	noLoop();
}

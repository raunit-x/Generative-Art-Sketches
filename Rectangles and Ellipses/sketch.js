let colorPalettes;
let populationSize = 1200;
let rectangleClusters = new Array();
let chosenPalette;
function setup() {
	createCanvas(1200, 800);
	pixelDensity(1);
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

	
	for (let i = 0; i < populationSize; ++i) {
		let index = Math.floor(random(0, colorPalettes.length));
		let x = random(0, width);
		let y = random(0, height);
		let mul = x * y;
		let index2 = Math.floor(map(y, 0, height, 3, 0));
		// let index2 = Math.floor(random(0, 4));
		rectangleClusters.push(new RectangleCluster(x, y, colorPalettes[index][index2]));
	}
}

function draw() {
	background(color('#fbf8f8'));
	// background(0);
	for (let cluster of rectangleClusters)
		cluster.show();
	noLoop();
}
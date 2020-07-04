let colorPalettes;
let counter = 0;
let chosenColor;
let stemColor;
let rows = 4, cols = 4;
let cells = new Array(rows * cols);
let cellWidth;
function setup() 
{
	createCanvas(800, 800);
	colorPalettes = [
		[color('#324851'), color('#86AC41'), color('#34675C'), color('#7DA3A1')],
		[color('#021C1E'), color('#004445'), color('#2C7873'), color('#6FB98F')],
		[color('#003B46'), color('#07575B'), color('#66A5AD'), color('#C4DFE6')],
		[color('#46211A'), color('#693D3D'), color('#BA5536'), color('#A43280')],
		[color('#4C3F54'), color('#D13525'), color('#F2C057'), color('#486824')],
		[color('#EAE2D6'), color('#D5C3AA'), color('#867666'), color('#E1B80D')],
		[color('#301B28'), color('#523634'), color('#B6452C'), color('#DDC5A2')]
	];
	let index = Math.floor(random(0, colorPalettes.length));
	chosenColorPalette = colorPalettes[index];
	index = Math.floor(random(0, colorPalettes.length));
	stemColor = colorPalettes[index];
	// console.log(chosenColorPalette);
	
	cellWidth = width / rows;
	for(let i = 0; i < rows; ++i)
	{
		for(let j = 0; j < cols; ++j)
		{
			let index = Math.floor(random(0, colorPalettes.length));
			trailColor = colorPalettes[index];
			stemColor = colorPalettes[(index + 1) % colorPalettes.length];
			cells[i * rows + j] = new Cell(i, j, trailColor, stemColor);
		}
	}
	background(0);

}

function draw() 
{
	for(let cell of cells)
	{
		cell.show();
		cell.update();
	}
}
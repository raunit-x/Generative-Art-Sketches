let populationSize = 500;
let spirals = new Array(populationSize);
let colorPalettes;

function setup()
{
    colorPalettes = [
		[color('#324851'), color('#86AC41'), color('#34675C'), color('#7DA3A1')],
		[color('#021C1E'), color('#004445'), color('#2C7873'), color('#6FB98F')],
		[color('#003B46'), color('#07575B'), color('#66A5AD'), color('#C4DFE6')],
		[color('#46211A'), color('#693D3D'), color('#BA5536'), color('#A43280')],
		[color('#4C3F54'), color('#D13525'), color('#F2C057'), color('#486824')],
		[color('#EAE2D6'), color('#D5C3AA'), color('#867666'), color('#E1B80D')],
		[color('#301B28'), color('#523634'), color('#B6452C'), color('#DDC5A2')]
    ];
    let chosenPalette = colorPalettes[Math.floor(random(0, colorPalettes.length))];
    createCanvas(700, 800);
    for(let i = 0; i < populationSize; ++i)
    {
        let index = Math.floor(random(0, chosenPalette.length));
        spirals[i] = new Spiral(chosenPalette[index]);
    }
}

function draw()
{
    background(0);
    for(let spiral of spirals){
        spiral.show();
        spiral.update();
    }

}
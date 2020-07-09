	var inc = 0.1;
	var scl = 20;
	var cols, rows;
	var fr;
	var zOff = 0;

	var particles = [];
	var numPartices = 10000;
	var flowfield = [];
	var dark = true;
	let count = 0;
	let colorPalettes;

	function setFlowField()
	{
		var yOff = 0;
		for(var y = 0; y < rows; ++y) 
		{
			var xOff = 0;
			for(var x = 0; x < cols; ++x)
			{
				var r = noise(xOff, yOff) * PI * 2; 
				// var r = (((y * y) / rows) + ((x * x) / cols)) * PI;
				var v = p5.Vector.fromAngle(r);
				v.setMag(1.2);
				flowfield[x + y * cols] = v;
				xOff += inc;
			}
			yOff += inc;
		}
	}

	function setup()
	{
		createCanvas(600, 800);
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
			[color('#1E1F26'), color('#283655'), color('#4D648D'), color('#D0E1F9')]
		];
		let chosenPalette = colorPalettes[Math.floor(random(0, colorPalettes.length))];
		// let chosenPalette = colorPalettes[colorPalettes.length - 7];
		cols = Math.floor(width / scl);
		rows = Math.floor(height / scl);
		for(var i = 0; i < numPartices; ++i)
			particles[i] = new Particle(chosenPalette[Math.floor(random(0, 4))]);
		// background(color('#fffaf0'));
		background(0);
		setFlowField();
	}

	function toggleTheme()
	{
		dark = !dark;
		console.log(dark);
		if(dark)
			background(0);
		else background(255);
		
	}



	function draw()
	{
		if(count == 10)
		{
			noLoop();
			save('myImage.png');
		}
		++count;
		stroke(0);
		// zOff += inc / 10;
		for(var i = 0; i < numPartices; ++i)
		{
			particles[i].follow(flowfield);
			particles[i].update();
			particles[i].show();
		}
		// fr.html(frameRate());
	}
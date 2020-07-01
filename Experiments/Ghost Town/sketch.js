let qTree;
let pi = "909336747468844785641481744590912453981032300885920637101563587565164309596112739640158617697813140879507371428831776043668981962641347500697194056519504550516774239794019689986252789008523744580732886706974177396357254506098542345678985204250732286070942026394841828669256606166544407204577568393932312265407812478316668801803018422504520053551868684850558453085253849754261205794305353308074775082649608852944557278500344139558937933505118403022529870616291505964225999600585648957233653179869136696994427866578912525684626041479811086568557173907213307893310852590333311371858772870349262790271567329168662716674908199318258316683282850015757078016119316922193151475493775515980465409283999109493742010371708560860588178544900570410413604043513764246899815268060925540112346532950434918053747735616666710469298309567892031648206393173922124840551203478063211131681337322406321645541558823784609194273808850283831236226654974430055809989829957425843235376429863146563505528356047709075747328263677043963097923465629794934456641396085146437130393213677421247090445272154068792154263064259726029201899465529811514261260490076386714173023572727683904155972345066669386646058829201247114417883178223482153389187605836327618181943322769555311258190484751746290562001346899644071619823205434718461102051131555093022682510749199014960817856260510885903658474515037638491513400032951639910621924055728300810352176197961683221398169240835763955621165712611219290508716325525855864961663825419359148218187619592329205699550637645818268557522115278701180299433546741536276207749785405413330313633542368241010846476374906388527984149007646469764854009479635895497546144813763697059163569983681198752505479306935320757076678014844770142471624190816682249007420711186488154772891718653596776539579933503342728214605416964960098470697958559264304287036366471307131478233061157641991322242064609989883076268583605552740990478467610760424178421506285175573529996478625529542836742987066457943375801014074021161861448432976574426342852870477855630830963143527878304194501970294657577773281674685808745393160393725331589928057943463140873586086177882633492774615118491165513068184671367734882334108513640394793920887688633633946138235834479408156961091429387734713893423773619109646056424447477908207604966027135616895410644483213659808293890972961891211834291490616389638610693752089534688398334446718982124347807238740745769755450743684674713502485881839966556819634452881194183317263682505061186490039412552057457120360355780251419043526718372192138482990580322469584243231589844325103965443535053543229216747040778614684859762557446153511880031430569954927847167454497269761283933251838197222328360707522781292813010656941262948730634268837338181742170608647548276394242391402753218042951903411635170469807423351556057857562450999253201787499636640473477038985587306507603870997731843128109897898820854355955094325390237189521682023344245572575307879263398550901645594237339662522335164875058955694217297244895998825089232112034795894154654603037878617591571661398869326873749684730549653293782147564810579380828530053244708050656929422340010959348294614539078890661626402150130735330033192074563726377077099939992288621224324880206263485088853036010723436890136064275814252839878594917997961121963797576519245218670960880921371119775000878159304307293448839309575741592413752859777972918934538505080383198677459002518657917237080857416429715380788406071306868036198241971577476389507253468404569192759531937223702229015580065607604738547359904477996748749969769427137668695533195125337764098587096683863263926164945608684140374568420719405950701743035469182150900466493998551741389385197573121568261622862231881096729747606013028331193716114087472706762558567775119956667486151964912970193318084994109618139296492789360902125354433273750642606242994120327362558244174983450947309453436615907284163193683075719798068231535737155571816122156787936425013887117023275555779302266785803199930810830576307652332050740013939095807901637717629259283764874790177274125678190555562180504876746991140839977919376542320623374717324703369763357925891515260315614033321272849194418437150696552087542450598956787961303311646283996346460422090106105779458151";
let digits;
let index;
var inc = 0.1;
var scl = 20;
var cols, rows;
var fr;
var zOff = 0;

var particles = [];
var numPartices = 500;
var flowfield = [];
var dark = true;
let count = 0;
let buildingCount = 0;

function generateBuilding()
{
  if(buildingCount > 6)
    return;
  let buildingHeight = random(height / 4, 3 * height / 4);
  let buildingWidth = random(30, 60);
  let bottomLeftX = random(width - 90) + 20;
  for(let i = 0; i < 1000; ++i)
  {
    qTree.insert(new Point(bottomLeftX + random(buildingWidth), random(buildingHeight, height)));
  }
  buildingCount++;
}

function setup() {
  createCanvas(1200, 800);
  let edgeSize = width;
  qTree = new QuadTree(new Rectangle(width / 2, width / 2, width / 2, width / 2), 1);
  const sdigits = pi[0].split('');
  index = 0;
  digits = pi;
  background(0);
  stroke(255);
  noFill();
  for (let i = 0; i < 250; ++i)
    point(random(width), random(height / 2));
  cols = Math.floor(width / scl);
  rows = Math.floor(height / scl);
  for (var i = 0; i < numPartices; ++i)
    particles[i] = new Particle();
  // translate(width / 8, height / 8);
  // ellipse(0, 0, 40, 40);
}



function draw() {
  // if (mouseIsPressed)
  //   for (let i = 0; i < 10; ++i)
  //     qTree.insert(new Point(mouseX + random(-5, 5), mouseY + random(-5, 5)));

  generateBuilding();
  // background(0);
  qTree.show();
  drawPI();
  drawPerlin();
}

function drawPI() {
  if (index == 350)
    return;
  translate(width / 6, height / 6);
  noStroke();
  ellipse(0, 0, 80, 80);
  const digit = digits[index % pi.length];
  const nextDigit = digits[(index + 1) % pi.length];
  index++;
  const diff = TWO_PI / 10;
  const a1 = map(digit, '0', '9', 0, TWO_PI) + random(-diff, diff);
  const a2 = map(nextDigit, '0', '9', 0, TWO_PI) + random(-diff, diff);
  const x1 = 40 * cos(a1);
  const y1 = 40 * sin(a1);
  const x2 = 40 * cos(a2);
  const y2 = 40 * sin(a2);
  stroke(255, 50);
  line(x1, y1, x2, y2);
  translate(-width / 6, -height / 6);
}

function drawPerlin()
{
	if(count == 350)
		return;
	++count;
	stroke(0);
	var yOff = 0;
	for(var y = 0; y < rows; ++y) 
	{
		var xOff = 0;
		for(var x = 0; x < cols; ++x)
		{
			var r = noise(xOff, yOff, zOff) * TWO_PI * 4; 
			var v = p5.Vector.fromAngle(r);
			v.setMag(0.2);
			flowfield[x + y * cols] = v;
			xOff += inc;
		}
		yOff += inc;
	}
	// zOff += inc / 10;
	for(var i = 0; i < numPartices; ++i)
	{
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].show();
	}
	// fr.html(frameRate());
}

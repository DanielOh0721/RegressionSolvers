

let a = [
		[1,1,1,1],
		[1,3,1,1],
		[1,1,6,1],
		[1,1,1,2]];
let b = [5,2,6,7];


// ------------------Visual Stuffs------------------

var dotsX = [];
var dotsY = [];

const mean = ( input ) => {
	var total = 0;
	for(var i = 0; i< input.length;i++)
		total += input[i];
	return total/input.length;
}

function setup() {
	createCanvas(640,640);
	background(60,60,60);}

function mousePressed() {
	dotsX.push(mouseX);
	dotsY.push(map(mouseY,0,640,640,0));
}

function draw(){
	background(60,60,60);
	for(var i = 0;i<dotsX.length;i++){
		strokeWeight(5);
		stroke(255,255,255);
		point(dotsX[i],map(dotsY[i],640,0,0,640));
	}
	var Xs = [0,0,0,0,0,0,0];
	var y = 0 ,xy =0,x2y =0,x3y =0;
	for(var i = 0;i< dotsX.length;i++){
		Xs[6] += Math.pow(dotsX[i],6);
		Xs[5] += Math.pow(dotsX[i],5);
		Xs[4] += Math.pow(dotsX[i],4);
		Xs[3] += Math.pow(dotsX[i],3);
		Xs[2] += Math.pow(dotsX[i],2);
		Xs[1] += dotsX[i];
		xy += dotsX[i]*dotsY[i];
		x2y += Math.pow(dotsX[i],2) * dotsY[i];
		x3y += Math.pow(dotsX[i],3) * dotsY[i];
		y += dotsY[i];
	}
	//console.log(Xs);
	Xs[0] = dotsX.length;
	var mat1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];  // 6543 5432 4321 3210
	var mat2 = [x3y,x2y,xy,y];
	for(var i =0;i<4;i++){
		for(var j =0;j<4;j++){
			mat1[i][j] = Xs[6-(j+i)];
		}
	}

	//console.log(mat1, mat2);
	var answers = [0,0,0,0,0];
	if(math.det(mat1) !== 0)answers = math.multiply(math.inv(mat1),mat2);

	var tempY = answers[3];
	for(var i = 1;i<windowWidth && dotsX.length > 3;i++){
		var yVal = answers[0]*Math.pow(i,3)+ answers[1]*Math.pow(i,2) + answers[2]*i + answers[3];
		line(i-1,map(tempY,0,640,640,0),i,map(yVal,0,640,640,0));
		tempY = yVal;
	}


	var r2 =0, SSE =0,SST =0;
	for(var i =0;i<dotsX.length;i++){
		SSE += Math.pow(dotsY[i]-answers[0]*Math.pow(dotsX[i],3)-answers[1]*Math.pow(dotsX[i],2) - answers[2]*dotsX[i] - answers[3],2);
		SST += Math.pow(dotsY[i]-(y/dotsY.length),2);
	}
	r2 = 1-(SSE/SST);
	if(r2 > 1 || r2 < 0)r2 = 'Null';

	noStroke();
	fill(255,255,255);
	textAlign(RIGHT,BOTTOM);
	textSize(25);
	text(`R² = ${Math.round(r2 * 1000) / 1000}   `,640,600);
	text(`y = ${Math.round(answers[0] * 10000000) / 10000000}x3 + (${Math.round(answers[1] * 100) / 100}x2) + (${Math.round(answers[2] * 100) / 100}x) + ${Math.round(answers[3] * 100) / 100}  `,640,640);
}


/*
 * Finding Regression Function
 * by using The method of Least Squares
 *
 * by Daniel Oh, Sep,24,2018
*/

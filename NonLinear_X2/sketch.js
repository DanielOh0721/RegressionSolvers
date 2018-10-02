
// Solving Matrix Equation (3 varible Equation)
const det = (a, b, c, d) => {
	return (a*d) - (c*b);
}

const det3 = (m) => { 
	return m[0][0]*det(m[1][1],m[1][2],m[2][1],m[2][2]) - m[0][1]*det(m[1][0],m[1][2],m[2][0],m[2][2]) + m[0][2]*det(m[1][0],m[1][1],m[2][0],m[2][1]);
}

const Mtrans = (m) => {
	var ret = [[0,0,0],[0,0,0],[0,0,0]];
	for(var i =0;i<m.length;i++){
		ret[0][i] = m[i][0];
		ret[1][i] = m[i][1];
		ret[2][i] = m[i][2];
	}
	return ret;
}

const Adj = (m) => {
	var ret = [[0,0,0],[0,0,0],[0,0,0]];
	ret[0][0] = det(m[1][1],m[1][2],m[2][1],m[2][2]);
	ret[0][1] = det(m[1][0],m[1][2],m[2][0],m[2][2]) * -1;
	ret[0][2] = det(m[1][0],m[1][1],m[2][0],m[2][1]);
	ret[1][0] = det(m[0][1],m[0][2],m[2][1],m[2][2]) * -1;
	ret[1][1] = det(m[0][0],m[0][2],m[2][0],m[2][2]);
	ret[1][2] = det(m[0][0],m[0][1],m[2][0],m[2][1]) * -1;
	ret[2][0] = det(m[0][1],m[0][2],m[1][1],m[1][2]);
	ret[2][1] = det(m[0][0],m[0][2],m[1][0],m[1][2]) * -1;
	ret[2][2] = det(m[0][0],m[0][1],m[1][0],m[1][1]);
	return ret;
}

const MInverse = (m) => {
	var ret = Adj(Mtrans(m));
	var det = det3(m);
	for(var i =0; i<3;i++){
		for(var j =0;j<3;j++){
			ret[i][j] = ret[i][j] / det;
		}
	}
	return ret;
}

const matMul = (m1, m2) => {
	var ret = [0,0,0];
	for(var i = 0;i<3;i++){
		var subTotal =0;
		for(var j =0;j<3;j++)
			subTotal += m1[i][j] * m2[j];
		ret[i] = subTotal;
	}
	return ret;
}

const solveEq = (a,b) => {
	return matMul(MInverse(a), b);
}

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
	background(60,60,60);30.42179
}

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
	var X4 =0, X3 = 0, X2 = 0, x =0, y =0 ,xy =0,x2y =0;
	for(var i = 0;i< dotsX.length;i++){
		X4 += Math.pow(dotsX[i],4);
		X3 += Math.pow(dotsX[i],3);
		X2 += Math.pow(dotsX[i],2);
		xy += dotsX[i]*dotsY[i];
		x2y += Math.pow(dotsX[i],2) * dotsY[i];
		x += dotsX[i];
		y += dotsY[i];
	}
	var matrix1 = [[0,0,0],[0,0,0],[0,0,0]];
	var matrix2 = [ 0,0,0 ];
	
	matrix1[0][0] = X4;
	matrix1[0][1] = X3;
	matrix1[0][2] = X2;
	matrix1[1][0] = X3;
	matrix1[1][1] = X2;
	matrix1[1][2] = x;
	matrix1[2][0] = X2;
	matrix1[2][1] = x;
	matrix1[2][2] = dotsX.length;

	matrix2[0] = x2y;
	matrix2[1] = xy;
	matrix2[2] = y;
	var answers = matMul(MInverse(matrix1), matrix2);

	var tempY = answers[2];
	for(var i = 1;i<windowWidth;i++){
		var yVal = answers[0]*Math.pow(i,2) + answers[1]*i + answers[2];
		line(i-1,map(tempY,0,640,640,0),i,map(yVal,0,640,640,0));
		tempY = yVal;
	}

	var r2 =0, SSE =0,SST =0;
	for(var i =0;i<dotsX.length;i++){
		SSE += Math.pow(dotsY[i]-answers[0]*Math.pow(dotsX[i],2) - answers[1]*dotsX[i] - answers[2],2);
		SST += Math.pow(dotsY[i]-(y/dotsY.length),2);
	}
	r2 = 1-(SSE/SST);

	noStroke();
	fill(255,255,255);
	textAlign(RIGHT,BOTTOM);
	textSize(25);
	text(`R² = ${Math.round(r2 * 100) / 100}   `,640,600);
	text(`y = ${Math.round(answers[0] * 10000) / 10000}x² + (${Math.round(answers[1] * 100) / 100}x) + ${Math.round(answers[2] * 100) / 100}  `,640,640);
}


/*
 * Finding Regression Function
 * by using The method of Least Squares
 *
 * by Daniel Oh, Sep,24,2018
*/

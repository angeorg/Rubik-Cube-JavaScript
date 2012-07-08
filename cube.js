 /*
  * Rubik's Cube Demonstration using JavaScript
  * 
  * Author: Anton Georgiev
  * URL: http://www.codelibary.com/
  * Copyright: (c) 2011 - Anton Georgiev
  */

cube = new Object();
cube.sides = new Array();
cube.navigator = new Array();
cube.colors = new Array('blue', 'yellow', 'red', 'green', 'orange', 'white');
cube.numSides = 6;
cube.numColours = 9;
cube.square = 30;
cube.spacing = 35;

/*		Usage		cube.start();
		Purpose:	The object in action.
 */
cube.start = function() {
	this.generate();
	this.draw(1);
	this.debug(); //optional
}

/*		Usage		cube.generate();
		Purpose:	Generating two multidimension arrays for the cube's sides and cube's colors.
 */
cube.generate = function() {
	for (var i = 0; i < this.colors.length; i++) {
		this.colors[this.colors[i]] = 0;
	}
	for (var i = 1; i <= this.numSides; i++) {
		var sbor = 0;
		this.sides[i] = new Array();
		this.navigator[i-1] = i;
		while (this.sides[i].length < this.numColours) {
			var rand = Math.floor(Math.random() * this.numSides);
			var color = this.colors[rand];
			if (this.colors[color] < this.numColours) {
				this.sides[i][sbor] = color;
				this.colors[color]++;
				sbor++;
			}
		}
	}
}

/*		Usage:		cube.generate(side)
		Purpose:	Displaying a side from the box. The sides are numbered from 1 to 6.
					The sides that are spinning horizontal are from 1 to 4.
 					Bottom side is numbered 6 and the upper side is numbered 5.
 */
cube.draw = function(side) {
	var canvas = document.getElementById("canvas");
	var sbor = 0;
	var mor = 0;
	for (var i = 0; i < this.numColours; i++) {
		var drawElement = canvas.getContext("2d");
		var gradient = drawElement.createLinearGradient(10, 0, 150, 0);
		gradient.addColorStop(0, this.sides[side][i]);
		gradient.addColorStop(1, "#ffffff");
		drawElement.fillStyle = gradient;
		if (i != 0 && (i%3) == 0) {
			sbor = 0;
			mor += this.spacing;
		}
		drawElement.fillRect(mor, sbor, this.square, this.square);
		sbor += this.spacing;
	}
}

/*		Usage:		cube.spin(position)
					Positions: 0 - Up, 1 - Left, 2 - Right, 3 - Down
		Purpose:	Spin the sides using the navigation buttons.
					The sides are switching using the following matrix structure:
 								n (k)
								n (k)
						n (k)	n (k)	n (k)
								n (k)
					n - numbers
					(k) - positions
 */
cube.spin = function(position) {
	var combs = new Array();
	var values = new Array();
	
	//matrix for switching the positions in each direction	
	combs[0] = new Array(5, 1, 4, 3, 0, 2); //up
	combs[1] = new Array(1, 2, 3, 0, 4, 5); //left
	combs[2] = new Array(3, 0, 1, 2, 4, 5); //right
	combs[3] = new Array(4, 1, 5, 3, 2, 0); //down

	for (var i = 0; i < this.numSides; i++) {
		values[i] = this.navigator[combs[position][i]];
	}
	for (var i = 0; i < this.numSides; i++) {
		this.navigator[i] = values[i];
	}
	this.draw(this.navigator[0]);
}

/*		Usage:		cube.debug()
		Purpose:	Display the colours' combinations in each side.
 */
cube.debug = function() {
	var output;
	output = '<br /><table id="table"><tbody>';
	for (var i = 1; i <= this.numSides; i++) {
		output += '<tr><td>Side ' + i + '</td>';
		for (var z = 0; z < this.sides[i].length; z++) {
			output += '<td>' + this.sides[i][z] + '</td>';
		}
	}
	output += '</tr></tbody></table>';
	document.write(output);
}
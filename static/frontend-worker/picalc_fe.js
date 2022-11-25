//this function shall run on frontend
function piCalc() { //Exporting functions: https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
	// Remember when we started
	var start = new Date().getTime();
	//define global variables
	var pi;

	/* JavaScript program for estimation of Pi using Monte
	Carlo Simulation */
	//https://www.geeksforgeeks.org/estimating-value-pi-using-monte-carlo/


	// Defines precision for x and y values. More the
	// interval, more the number of significant digits

	let INTERVAL = 10000

	let interval,
		i;
	let rand_x, rand_y, origin_dist;
	let circle_points = 0, square_points = 0;

	// Total Random numbers generated = possible x
	// values * possible y values
	for (i = 0; i < (INTERVAL * INTERVAL); i++) {

		// Randomly generated x and y values
		rand_x = (Math.random() * (INTERVAL)) / INTERVAL;
		rand_y = (Math.random() * (INTERVAL)) / INTERVAL;

		// Distance between (x, y) from the origin
		origin_dist = rand_x * rand_x + rand_y * rand_y;

		// Checking if (x, y) lies inside the define
		// circle with R=1
		if (origin_dist <= 1)
			circle_points++;

		// Total number of points generated
		square_points++;

		// estimated pi after this iteration
		pi = (4 * circle_points) / square_points;

		// For visual understanding (Optional)
		// console.log(rand_x, rand_y , circle_points,
		// square_points, "-", pi)

	}
	// Final Estimated Value
	console.log("\nFinal Estimation of Pi = " + pi);
	// Remember when we finished
	var end = new Date().getTime();

	// Now calculate and output the difference
	console.log(end - start);
	let time = end - start
	let json = {
		"time": time,
		"pi": pi
	}

	return json
}

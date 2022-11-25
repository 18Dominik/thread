importScripts("./picalc_fe.js") //as of writing this code, Edge browser doesn't support import modules for web workers at all. Alternative Firefox: using usual "import"/"export" syntax for modules does not work for Web Workers, see workaround with importScripts in worker in web worker initializiation here https://stackoverflow.com/questions/44118600/web-workers-how-to-import-modules


// worker takes computationally expensive work to free the main thread that interacts with the UI/DOM
onmessage = (e) => {
	console.log('Message received from main script');
	let result = piCalc()
	const workerResult = `Pi: ${result.pi}. Time: ${result.time}`;
	console.log('Posting message back to main script');
	postMessage(workerResult);//you can't directly manipulate the DOM from inside a worker. Only main thread can access the DOM. Therefore, message back to main JS thread. https://stackoverflow.com/questions/40859340/how-to-get-the-control-value-or-element-using-webworker
}
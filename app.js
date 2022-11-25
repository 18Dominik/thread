//NodeJs Docu: https://nodejs.org/docs/latest-v15.x/api/esm.html

//JavaScript is per default single threated. Computationally expensive work may freeze/block the UI
//Web workers enable multithreading in JavaScript
//Web workers cannot alter the DOM, only the main thread can alter the DOM
//Therefore, web workers and main thread communicate via messages

//Required external modules: https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_import_specifiers
//CJS vs. ESM: https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
//Understanding JavaScript import and export (ESM syntax): https://sebhastian.com/javascript-import-export/
import express, { json, request } from 'express'; //Node.js-Framework von Webanwendungen
import piCalc from './static/picalc_main.js'; //Monte Carlo Simulation to calculate pi
import { Piscina } from 'piscina'; // creating a pool of Node.js Worker Threads to which one or more tasks may be dispatched: https://www.npmjs.com/package/piscina
import bodyParser from "body-parser"; //Necessary library to parse the body in nodejs express: http://expressjs.com/en/resources/middleware/body-parser.html, https://github.com/expressjs/body-parser, https://stackoverflow.com/questions/60236819/how-to-use-body-parser-with-import-and-not-required-es6
//import web worker modules
import {
  Worker,
  isMainThread,
  parentPort,
} from 'worker_threads';

//https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname
//https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
//These CommonJS variables are not available in ES modules.
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//

//Required app variables
var app = express();

////Set static files to outsource javascript files from html file via <script src="static/script.js"></script> 
app.use("/static", express.static('./static/')); // https://stackoverflow.com/questions/54173476/js-file-gets-a-neterr-aborted-404-not-found
//Set bodyParser: https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Main Thread
if (isMainThread) {
  /////////////////////////////////////////
  //Piscina (backend) worker
  const piscina = new Piscina({ filename: './static/backend-worker/piscina-worker.js' });

  //get result from monte carlo simulation
  app.get('/piscina', async function (req, res) {
    let pi_piscina = await piscina.run(); //await is waiting for result of a promise. Async  functions alsways returns promise. Await can only be used in Async function
    res.status(200).json(pi_piscina);
  });
  app.post('/numberofWorkers', async function (req, res) {
    var r = req.body.numberofWorkers;
    var avg = 0;
    var avg_time = 0;
    var w = []; //worker array
    for (let i = 0; i < r; i++) {
      w.push(piscina.run())
    }
    const result = await Promise.all(w); //result pisicna worker array
    //console.log(res); gives back array of json "time" & "pi" key
    var v = []; //single pi values
    var t = []; //single time values
    result.forEach((elem) => v.push(elem.pi));
    result.forEach((elem) => t.push(elem.time));
    avg = v.reduce((a, b) => a + b) / v.length; //reduce function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    avg_time = t.reduce((a, b) => a + b) / t.length;
    //console.log(v);
    //console.log(avg);
    res.send({ "avg": avg, "avg_time": avg_time });


  });
  /////////////////////////////////////////////////
  // This code is executed in the main thread and not in the worker.
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });

  //#get index.html
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  //initialize variable pi with result of function piCalc 
  var pi_main = piCalc();
  //get result from monte carlo simulation
  app.get('/main', function (req, res) {
    res.status(200).json(pi_main);
  });
  // Create the worker.
  //https://medium.com/@Trott/using-worker-threads-in-node-js-80494136dbb6
  //https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
  //Documentation: https://nodejs.org/api/worker_threads.html
  const worker = new Worker(__filename);
  // Listen for messages from the worker and print them.
  worker.on('message', (msg) => {
    console.log(msg);
    //get result from monte carlo simulation
    app.get('/worker', function (req, res) {
      res.status(200).json(msg);
    });
  });
  /////////////////////////////////////////////////////////
} else { //Worker Thread
  // This code is executed in the worker and not in the main thread.
  //initialize variable pi with result of function piCalc 
  var pi_worker = piCalc();
  //console.log('Client-side code running');

  // Send a message to the main thread.
  parentPort.postMessage(pi_worker);
}


//#Init
//npm init
//#Start application
//run in terminal via "node [filename.js]" or npm start (see package.json)
// use "code runner" extension for play button
//#Test application witch Mocha (see package.json): 
//npm run test 
////docker:
//docker build image: docker build . -t dominik/worker-threads-app
//docker run -p 3000:8080 -d dominik/worker-threads-app
 
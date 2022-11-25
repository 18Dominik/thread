//this is a frontend worker
function startPiCalcWorker() {
  const myWorker = new Worker("static/frontend-worker/piCalc_worker.js");
  myWorker.postMessage("start worker");
  console.log('Message posted to worker');

  myWorker.onmessage = (e) => {
    document.getElementById("piCalc_worker_fe").innerHTML = e.data; //Alternative:   //worker.textContent = e.data; 
    //Difference between .textContent and .innerHTML
    //https://developer.mozilla.org/de/docs/Web/API/Node/textContent
    console.log('Message received from worker');
  }
}
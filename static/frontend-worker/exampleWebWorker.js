//this is a frontend worker
//example taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
function startExampleWorker() {
    const myWorker = new Worker("static/frontend-worker/example_worker.js");
    myWorker.postMessage([2, 3]);
    console.log('Message posted to worker');
  
    myWorker.onmessage = (e) => {
      document.getElementById("example_worker").innerHTML = e.data; //Alternative:   //worker.textContent = e.data; 
      //Difference between .textContent and .innerHTML
      //https://developer.mozilla.org/de/docs/Web/API/Node/textContent
      console.log('Message received from worker');
    }
  }
  
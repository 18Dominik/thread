//this is an example for webworker
// worker takes computationally expensive work to free the main thread that interacts with the UI/DOM
onmessage = (e) => {
    console.log('Message received from main script');
    const workerResult = `Prodcut: ${e.data[0] * e.data[1]}`;
    console.log('Posting message back to main script');
    postMessage(workerResult);//you can't directly manipulate the DOM from inside a worker. Only main thread can access the DOM. Therefore, message back to main JS thread. https://stackoverflow.com/questions/40859340/how-to-get-the-control-value-or-element-using-webworker
  }
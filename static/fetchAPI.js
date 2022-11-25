//Fetch API: 
////Medium Article: https://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c

////Mozilla Docu: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
/// use relative file paths: https://www.w3schools.com/html/html_filepaths.asp so you don't have to adjust fetch-path.
function fetchMain() { //connects to html button: https://www.w3schools.com/tags/ev_onclick.asp
    fetch('/main', {
      method: 'get'
    })
      .then(function (body) {
        return body.json(); //returns promise. Response object has information about the response itself. To actually get the data, we need to get the body of the response.
      }).then(function (data) {
        console.log(data);
        document.getElementById("piCalc_main_be").innerHTML = `Pi: ${data.pi}. Time: ${data.time}`;
      });
  };
  
  function fetchWorker() { //connects to html button: https://www.w3schools.com/tags/ev_onclick.asp
    fetch('/worker', {
      method: 'get'
    })
      .then(function (body) {
        return body.json(); //returns promise. Response object has information about the response itself. To actually get the data, we need to get the body of the response.
      }).then(function (data) {
        console.log(data);
        document.getElementById("piCalc_worker_be").innerHTML = `Pi: ${data.pi}. Time: ${data.time}`;;
      });
  };
  
  function fetchPiscina() { //connects to html button: https://www.w3schools.com/tags/ev_onclick.asp
    fetch('/piscina', {
      method: 'get'
    })
      .then(function (body) {
        return body.json(); //returns promise. Response object has information about the response itself. To actually get the data, we need to get the body of the response.
      }).then(function (data) {
        console.log(data);
        document.getElementById("piCalc_piscina_be").innerHTML = `Pi: ${data.pi}. Time: ${data.time}`;;
      });
  };
  
  function sendNumberofWorkers() {
    let numberofWorkers = document.getElementById("numberofWorkers").value;
    let restcall = {
      "numberofWorkers": numberofWorkers
    };
    //console.log(restcall)
    fetch('/numberofWorkers', {
      method: 'POST',
      headers: {
        'Content-type': "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify(restcall)
  
    })/* .then((response)=>response.text())
    .then((data)=>console.log(data))  */
      .then(output => {
        let result = document.getElementById("result");
        let avg_time = document.getElementById("avg_time");
        output.json().then(data => {
          result.innerHTML = data.avg;
          avg_time.innerHTML = data.avg_time
        })
      })
  }
  
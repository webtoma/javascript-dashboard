

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = a.getMonth();
    let date = a.getDate();
    let hour = a.getHours();
    let time = date + '/' + month + '/' + year + ' - ' + hour + 'h';
    return time;
  }

fetch('https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=50&lon=50&appid=654fe30faf595ab977787808c42965c6')
.then(response => response.json())
.then(response => {
    const pollution = response.list
    const tableauLength = pollution.length
    let coArray = [];
    let timeArray = [];
    for(i=0; i<tableauLength; i++){
        coArray.push(pollution[i].components.co)
        timeArray.push(timeConverter(pollution[i].dt))
    }
     console.log(coArray)
    const coArrayLength = coArray.length

      let data = {
        labels: timeArray,
        datasets: [{
          label: "CO in Air",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: coArray,
        }]
      };
      
      let options = {
        maintainAspectRatio: true,
        scales: {
          y: {
            stacked: true,
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      };
      
      new Chart('myChart', {
        type: 'line',
        options: options,
        data: data
      });
      
})
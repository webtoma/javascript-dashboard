fetch('https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=50&lon=50&appid=654fe30faf595ab977787808c42965c6')
.then(response => response.json())
.then(data => {
    const pollution = data.list
    const tableauLength = pollution.length
    let coArray = [];
    for(i=0; i<tableauLength; i++){
        coArray.push(pollution[i].components.co)
    }
    console.log(coArray)
    const coArrayLength = coArray.length
    
})
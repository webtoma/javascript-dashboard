let chart;
let lat = 48.852969;
let lon = 2.349903;
let macarte = null;

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = a.getMonth();
    let date = a.getDate();
    let hour = a.getHours();
    let time = date + '/' + month + '/' + year + ' - ' + hour + 'h';
    return time;
}
function createCoChart(lat, lon){
    fetch('https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat='+lat+'&lon='+lon+'&appid=654fe30faf595ab977787808c42965c6')
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
        
        if (chart) {
            chart.destroy();
            chart = new Chart('myChart', {
                type: 'line',
                options: options,
                data: data
            });
          } else {
            chart = new Chart('myChart', {
                type: 'line',
                options: options,
                data: data
            });
          }
        
        
    })
}
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('myMap').setView([lat, lon], 13);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
}

window.onload = function(){
    createCoChart(lat, lon);
    initMap(); 
    macarte.on('click', (event)=> {
        macarte.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                macarte.removeLayer(layer);
            }
        });
        L.marker([event.latlng.lat , event.latlng.lng]).addTo(macarte);
        chart.destroy();
        createCoChart(event.latlng.lat, event.latlng.lng);
    })
};
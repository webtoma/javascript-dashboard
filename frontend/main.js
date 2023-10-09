//variables de base que nous utiliserons
let chart;
let lat = 48.852969;
let lon = 2.349903;
let macarte;
let apikey = "654fe30faf595ab977787808c42965c6";


// fonction qui convertit les secondes UNIX TIME en date (jour/mois/année - heure)
function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = a.getMonth();
    let day = a.getDate();
    let hour = a.getHours();
    let time = day + '/' + month + '/' + year + ' - ' + hour + 'h';
    return time;
}


// fonction qui crée le graphique
function createGazChart(lat, lon, gaz){
    fetch('https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat='+lat+'&lon='+lon+'&appid='+apikey) // récupérer la data
    .then(response => response.json())                                      // convertir la data en json
    .then(response => {                                                     // utiliser la data
        const pollution = response.list                                     // récupérer la liste des données par heure
        const tableauLength = pollution.length                              // récupérer la longueur du tableau
        let gazArray = [];                                                  // créer un tableau vide pour les données de CO                
        let timeArray = [];                                                 // créer un tableau vide pour les données de temps
        for(i=0; i<tableauLength; i++){                                     // boucle pour récupérer les données de gaz et de temps
            if(gaz == 'co'){                                                // selon le gaz on charge la donnée correspondante
                gazArray.push(pollution[i].components.co)
            }else if(gaz == 'no'){
                gazArray.push(pollution[i].components.no)
            }else if(gaz == 'no2'){
                gazArray.push(pollution[i].components.no2)
            }else if(gaz == 'o3'){
                gazArray.push(pollution[i].components.o3)
            }else if(gaz == 'so2'){
                gazArray.push(pollution[i].components.so2)
            }else if(gaz == 'pm10'){
                gazArray.push(pollution[i].components.pm10)
            }

            timeArray.push(timeConverter(pollution[i].dt))                  // on ajoute les données de temps dans le tableau en les convertissant avec notre fonction timeConverter
        }
        let data = {                                                       // on crée un objet data pour le graphique
            labels: timeArray,
            datasets: [{
            label: gaz + " in Air",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: gazArray,
            }]
        };
        
        let options = {                                                     // on crée un objet options pour le graphique
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
        
        if (chart) {                                                       // si le graphique existe déjà on le détruit et on en crée un nouveau
            chart.destroy();
            chart = new Chart('myChart', {
                type: 'line',
                options: options,
                data: data
            });
          } else {                                                        // sinon on crée le graphique
            chart = new Chart('myChart', {
                type: 'line',
                options: options,
                data: data
            });
          }
    })
}

// Créer la carte avec les coordonnées lat/lon
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "myMap"
    macarte = L.map('myMap').setView([lat, lon], 13);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);              // Nous ajoutons le calque créé précédemment à notre carte
}

window.onload = function(){                     // Au chargement de la page
    createGazChart(lat, lon, 'co');              // on crée le graphique avec les valeurs du gaz "CO" par défaut
    initMap();                                  // on crée la carte
    macarte.on('click', (event)=> {            // on ajoute un event listener sur la carte pour récupérer les coordonnées de l'endroit cliqué
        macarte.eachLayer(function (layer) {   // on supprime les markers existants
            if (layer instanceof L.Marker) { 
                macarte.removeLayer(layer);
            }
        });
        L.marker([event.latlng.lat , event.latlng.lng]).addTo(macarte);     // on ajoute un marker sur la carte à l'endroit cliqué
        chart.destroy();                                                    // on détruit le graphique existant
        let selectedGaz = document.getElementById('pollution').value;       // on récupère la valeur du gaz sélectionné
        createGazChart(event.latlng.lat, event.latlng.lng, selectedGaz);    // on crée le graphique avec les nouvelles coordonnées et le nouveau gaz sélectionné
    })
};



let myForm = document.getElementById('pollutionForm');              // on récupère le formulaire
myForm.addEventListener('submit', (event) => {                      // on ajoute un event listener sur le formulaire
    event.preventDefault();                                         // on empêche le formulaire de se soumettre
    let selectedGaz = document.getElementById('pollution').value;   // on récupère la valeur du gaz sélectionné
    createGazChart(lat, lon, selectedGaz);                          // on crée le graphique avec les nouvelles coordonnées et le nouveau gaz sélectionné
})


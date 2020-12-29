// query selector
const locations = document.querySelector("#location");
const weatherimg = document.querySelector("#weather-img");
const weathertext = document.querySelector("#weather-text");
const weatherdate = document.querySelector("#date");
const weatherdis = document.querySelector("#weather-dis");

// getting date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = dd + "/" + mm + "/" + yyyy;
// adding date to dom
if (weatherdate != null) {
    weatherdate.innerHTML = `${today}`;
}

function weatherfetch() {
    let lat, long;
    if (navigator.geolocation) {
        const responce = navigator.geolocation.getCurrentPosition(showPosition);
        function showPosition(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            if (lat != undefined && long != undefined) {
                const url = window.location.href;
                console.log(url);
                const api = `${url}api?lat=${lat}&long=${long}`;
                fetch(api)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);

                        const weather = data.main.temp.toString();
                        const weatherslice = weather.slice(0, 2);
                        weathertext.innerHTML = `${weatherslice}°C`;

                        const weatherimgid = data.weather[0].icon.toString();
                        const weatherimgurl = `http://openweathermap.org/img/wn/${weatherimgid}@2x.png`;

                        weatherimg.src = `${weatherimgurl}`;

                        const weatherdisc = data.weather[0].description.toString();
                        weatherdis.innerHTML = `${weatherdisc}`;

                        const name = data.name.toString();
                        locations.innerHTML = `${name}`;
                    });
            } else if ((lat = undefined)) {
                weatherdis.innerHTML = `Enable Your location`;
            }
        }
    } else {
        weatherdis.innerHTML = "location is not supported in your browser";
    }
}

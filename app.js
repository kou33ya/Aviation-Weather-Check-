const apiUrl = "https://api.checkwx.com/metar/"
const apiKey = "YOUR API KEY HERE"; //Use your apiKey of CheckWX API

async function getMetar(city) {
    const response = await fetch(apiUrl + city + "/decoded", {
        headers: {
            "X-API-Key": apiKey
        }
    });
    var data = await response.json();
    console.log(data);
    const metar = data.data[0];

    document.querySelector(".name").innerHTML = data.data[0].station.name;
    document.querySelector(".time").innerHTML = data.data[0].observed;
    document.querySelector(".flight-condition").innerHTML = data.data[0].flight_category;
    document.querySelector(".elevation").innerHTML = data.data[0].elevation.feet + "ft";
    document.querySelector(".temp").innerHTML = data.data[0].temperature.celsius + "°C";
    document.querySelector(".metar").innerHTML = data.data[0].raw_text;
    document.querySelector(".barometer .value").innerHTML = data.data[0].barometer.hg + "hg";
    document.querySelector(".visibility .value").innerHTML = data.data[0].visibility.miles + "SM";
    document.querySelector(".dew .value").innerHTML = data.data[0].dewpoint.celsius + "°C";

    if (metar.ceiling) {
        document.querySelector(".ceiling .value").innerHTML = data.data[0].ceiling.feet + " ft";
    } else {
        document.querySelector(".ceiling .value").innerHTML = "Unlimited / Clear";
    }

}

const searchBtn = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");

searchBtn.addEventListener('click', function() {
    getMetar(searchBox.value.toUpperCase());
});

getMetar("KSEA");
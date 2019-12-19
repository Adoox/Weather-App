const icon = document.querySelector(".weather_icon");
const temperature_value = document.querySelector(".temperature_value p");
const temperature_description = document.querySelector(
  ".temperature_description p"
);
const search = document.querySelector(".search_box");
const search_btn = document.querySelector(".search_btn");
const name_of_city = document.querySelector(".city_name p");
const start_btn = document.querySelector("#start_btn");
const get_btn = document.querySelector("#get");
const forecast_5_days = document.querySelector(".forecast_5_days");
const main_cotainer_toggle = document.querySelector(".main_container");
const wind = document.querySelector("#wind p");
const feels_like1 = document.querySelector("#feels_like p");
const max_temp = document.querySelector("#max_temp p");

/*Parametri za prognozu od narednih 5 dana*/
const day_1 = document.querySelector("#day_1 h3");
const day_2 = document.querySelector("#day_2 h3");
const day_3 = document.querySelector("#day_3 h3");
const day_4 = document.querySelector("#day_4 h3");
const day_5 = document.querySelector("#day_5 h3");
const day1_icon = document.querySelector(".day1_icon");
const day2_icon = document.querySelector(".day2_icon");
const day3_icon = document.querySelector(".day3_icon");
const day4_icon = document.querySelector(".day4_icon");
const day5_icon = document.querySelector(".day5_icon");
const day_1_temp = document.querySelector("#day_1 h2");
const day_2_temp = document.querySelector("#day_2 h2");
const day_3_temp = document.querySelector("#day_3 h2");
const day_4_temp = document.querySelector("#day_4 h2");
const day_5_temp = document.querySelector("#day_5 h2");
const day_1_description = document.querySelector("#day_1 p");
const day_2_description = document.querySelector("#day_2 p");
const day_3_description = document.querySelector("#day_3 p");
const day_4_description = document.querySelector("#day_4 p");
const day_5_description = document.querySelector("#day_5 p");
$(forecast_5_days).hide();

const weather = {};
weather.temperature = {
  unit: "celsius"
};

const kelvin = 273; /*koristimo za pretvaranje temperature iz kelvina u celsiuse nakon povlacenja podataka sa api-a*/
const api_key =
  "11bbb3a8a49a80badc3108d5c0bea07a"; /*api key sa openweathermap stranice*/

/*klikom na button "povecalo" pored input boxa, dohvaćamo podatke i prikazuju se na svojim predvidenim mjestima unutar diva*/
$(search_btn).click(function() {
  /*api prima vrijednost(search.value) naseg input boxa i prosljeduje kako bi dobili sve vrijednosti vezani za grad
  koji smo unijeli*/
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${api_key}`;
  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      console.log(data);
      weather.temperature.value = Math.floor(
        data.main.temp - kelvin
      ); /*pretvaranje kelvina u celzijuse*/
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.wind = data.wind.speed;
      weather.f_like = Math.floor(data.main.feels_like - kelvin);
      weather.max_temp = Math.floor(data.main.temp_max - kelvin);
    })
    .then(function() {
      displayWeather();
    })
    .catch(err => alert("Wrong city name"));
});

/*kreiranje funkcije za prikaz svih parametara koji ce mijenjati stanja vec postavljenih parametara koje
smo dobili dohvatom podataka preko api-a*/
function displayWeather() {
  icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  temperature_value.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  temperature_description.innerHTML = weather.description;
  name_of_city.innerHTML = `${weather.city}, ${weather.country}`;
  wind.innerHTML = `<span>Wind speed: </span>${weather.wind}`;
  feels_like1.innerHTML = `<span>Feels like: </span>${weather.f_like}°<span>C</span>`;
  max_temp.innerHTML = `<span>Max temp: </span>${weather.max_temp}°<span>C</span>`;
}

get_btn.addEventListener("click", function() {
  let api2 = `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&appid=${api_key}`;
  fetch(api2)
    .then(response => response.json())
    .then(data => {
      $(forecast_5_days).toggle(
        2000
      ); /*prikazivanje diva sa podacima za 5 dana*/
      console.log(
        data
      ); /*ispisivanje objekta sa svim parametrima u consoli radi lakse provjere*/
      /*definisanje imena dana u sedmici kako bi na osnovu datuma povucenog sa apija dobili tacno ime dana*/
      var dani_u_sedmici = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      /*ispisivanje prvog dana od 5 narednih*/
      var datum_1 = new Date(data.list[8].dt * 1000);
      var ime_dana_1 = dani_u_sedmici[datum_1.getDay()];
      day_1.innerHTML = ime_dana_1;
      /*prikazivanje icone u zavisnosti od vremena*/
      var day1_icon_weather = data.list[1].weather[0].icon;
      day1_icon.innerHTML = `<img src="icons/${day1_icon_weather}.png"/>`;
      /*prikazivanje max temp tog dana*/
      var temp_day1 = Math.floor(data.list[1].main.temp_max - kelvin);
      day_1_temp.innerHTML = `<span>Max: </span>${temp_day1}°<span>C</span>`;
      /*prikazivanje opisa vremena tog dana*/
      var descriotion_day_1 = data.list[1].weather[0].description;
      day_1_description.innerHTML = descriotion_day_1;
      console.log(ime_dana_1);

      /*ispisivanje drugog dana od 5 narednih*/
      var datum_2 = new Date(data.list[16].dt * 1000);
      var ime_dana_2 = dani_u_sedmici[datum_2.getDay()];
      day_2.innerHTML = ime_dana_2;
      /*prikazivanje icone u zavisnosti od vremena*/
      var day2_icon_weather = data.list[10].weather[0].icon;
      day2_icon.innerHTML = `<img src="icons/${day2_icon_weather}.png"/>`;
      /*prikazivanje max temp tog dana*/
      var temp_day2 = Math.floor(data.list[10].main.temp_max - kelvin);
      day_2_temp.innerHTML = `<span>Max: </span>${temp_day2}°<span>C</span>`;
      /*prikazivanje opisa vremena tog dana*/
      var descriotion_day_2 = data.list[10].weather[0].description;
      day_2_description.innerHTML = descriotion_day_2;
      console.log(ime_dana_2);

      /*ispisivanje treceg dana od 5 narednih*/
      var datum_3 = new Date(data.list[24].dt * 1000);
      var ime_dana_3 = dani_u_sedmici[datum_3.getDay()];
      day_3.innerHTML = ime_dana_3;
      /*prikazivanje icone u zavisnosti od vremena*/
      var day3_icon_weather = data.list[18].weather[0].icon;
      day3_icon.innerHTML = `<img src="icons/${day3_icon_weather}.png"/>`;
      /*prikazivanje max temp tog dana*/
      var temp_day3 = Math.floor(data.list[18].main.temp_max - kelvin);
      day_3_temp.innerHTML = `<span>Max: </span>${temp_day3}°<span>C</span>`;
      /*prikazivanje opisa vremena tog dana*/
      var descriotion_day_3 = data.list[18].weather[0].description;
      day_3_description.innerHTML = descriotion_day_3;
      console.log(ime_dana_3);

      /*ispisivanje cetvrtog dana od 5 narednih*/
      var datum_4 = new Date(data.list[32].dt * 1000);
      var ime_dana_4 = dani_u_sedmici[datum_4.getDay()];
      day_4.innerHTML = ime_dana_4;
      /*prikazivanje icone u zavisnosti od vremena*/
      var day4_icon_weather = data.list[26].weather[0].icon;
      day4_icon.innerHTML = `<img src="icons/${day4_icon_weather}.png"/>`;
      /*prikazivanje max temp tog dana*/
      var temp_day4 = Math.floor(data.list[26].main.temp_max - kelvin);
      day_4_temp.innerHTML = `<span>Max: </span>${temp_day4}°<span>C</span>`;
      /*prikazivanje opisa vremena tog dana*/
      var descriotion_day_4 = data.list[26].weather[0].description;
      day_4_description.innerHTML = descriotion_day_4;
      console.log(ime_dana_4);

      /*ispisivanje petog dana od 5 narednih*/
      var datum_5 = new Date(data.list[39].dt * 1000);
      var ime_dana_5 = dani_u_sedmici[datum_5.getDay()];
      day_5.innerHTML = ime_dana_5;
      /*prikazivanje icone u zavisnosti od vremena*/
      var day5_icon_weather = data.list[35].weather[0].icon;
      day5_icon.innerHTML = `<img src="icons/${day5_icon_weather}.png"/>`;
      /*prikazivanje max temp tog dana*/
      var temp_day5 = Math.floor(data.list[35].main.temp_max - kelvin);
      day_5_temp.innerHTML = `<span>Max: </span>${temp_day5}°<span>C</span>`;
      /*prikazivanje opisa vremena tog dana*/
      var descriotion_day_5 = data.list[35].weather[0].description;
      day_5_description.innerHTML = descriotion_day_5;
      console.log(ime_dana_5);
    })
    .catch(err => alert("Wrong city name"));
});

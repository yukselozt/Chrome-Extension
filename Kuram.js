document.querySelector(".button").addEventListener("click", makeApiRequest);
var clickCount = 0;
if (clickCount == 0) {
  document.querySelector(".weather").style.display = "none";
}
async function makeApiRequest() {
  const apiUrl = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "8a42062e71cb47b6b3260ac9fb75d934";
  const searchBox = document.querySelector(".search input");
  const query = `${apiUrl}weather?q=${searchBox.value}&appid=${apiKey}&units=metric`;
  const weatherIcon = document.querySelector(".weather-icon");
  const response = await fetch(query);

  clickCount++;

  if (response.status == 404 || searchBox.value == "") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "flex";
    var data = await response.json();
    // API'den gelen veriyi ekrana bas
    document.getElementById("city").innerHTML = data?.name;
    document.getElementById("temp").innerHTML = data?.main?.temp + " °C";
    document.getElementById("humidity").innerHTML = data?.main?.humidity + " %";
    document.getElementById("wind").innerHTML = data?.wind?.speed + " km/h";
    if (data?.weather[0]?.main == "Clouds") {
      weatherIcon.src = "/assets/clouds.png";
    } else if (data?.weather[0]?.main == "Clear") {
      weatherIcon.src = "/assets/clear.png";
    } else if (data?.weather[0]?.main == "Rain") {
      weatherIcon.src = "/assets/rain.png";
    } else if (data?.weather[0]?.main == "Drizzle") {
      weatherIcon.src = "/assets/drizzle.png";
    } else if (data?.weather[0]?.main == "Mist") {
      weatherIcon.src = "/assets/mist.png";
    } else {
      weatherIcon.src = "icon.png";
    }
  }
}

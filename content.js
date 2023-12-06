(() => {
  const buildHTML = () => {
    const popupHTML = `
      <div class="popupContainer" id="myPopup">
        <div class="popupContent">
            <button class="closeBtn">Kapat</button>
            <div id="card">
                <div class="search">
                    <input type="text" placeholder="Enter city name" spellcheck="false" />
                    <button id="button">
                    <img src=${chrome.runtime.getURL(
                      "assets/search.png"
                    )}  alt="" />
                    </button>
                </div>
              <div class="error">
                <p>Invalid City Name</p>
              </div>
              <div class="weather">
                <img src=${chrome.runtime.getURL(
                  "assets/clouds.png"
                )} class="weather-icon" alt="" />
                <h1 class="temp" id="temp">22 C</h1>
                <h2 class="city" id="city">Ankara</h2>
                <div class="details">
                  <div class="col">
                    <img src=${chrome.runtime.getURL(
                      "assets/humidity.png"
                    )} alt="" />
                    <div>
                      <p class="humidity" id="humidity">70 %</p>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div class="col">
                    <img src=${chrome.runtime.getURL(
                      "assets/wind.png"
                    )} alt="" />
                    <div>
                      <p class="wind" id="wind">7 km/h</p>
                      <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>         
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    var button = document.createElement("button");
    button.innerHTML = "Kuram";
    button.className = "kuramBtn";
    document.body.append(button);
    console.log("button created :)");
  };

  const buildCSS = () => {
    const css = `
        .kuramBtn {
            border-radius: 20px;
            padding: 10px;
            border: none;
            cursor: pointer;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 1000;
        }
        .closeBtn {
            border-radius: 20px;
            border: none;
            cursor: pointer; 
        }
        .popupContainer {
            all: unset;
            display: none;
            position: fixed;
            text-align: right;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* arka planı şeffaf koyu gri */
            justify-content: center; /* yatayda ortala */
            align-items: center; /* dikeyde ortala */
        }
        .popupContent {
            width: 600px;
            height: 600px;
            background: rgb(105, 105, 250);
        }
        .card {
            width: 600px;
            height: 600px;
            background-color: linear-gradient(135deg, #00feba, #5b548a);
            color: #fff;
            border-radius: 20px;
            text-align: center;
          }
          
          .search {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 10px;
            gap:10px;
          }
          
          .search input {
            border: 0;
            outline: 0;
            background: #ebfffc;
            color: #555;
            height: 60px;
            border-radius: 30px;
            padding: 0px 25px;
            flex: 1;
            font-size: 18px;
          }
          
          .search button {
            border: 0;
            outline: 0;
            background: #ebfffc;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            display: grid;
            place-items: center;
          }
          
          .search button img {
            width: 18px;
          }
          
          .weather {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
          }
          
          .weather-icon {
            width: 170px;
            margin-top: 30px;
          }
          
          .weather h1 {
            font-size: 80px;
            font-weight: 500;
          }
          
          .weather h2 {
            font-size: 45px;
            font-weight: 400;
            margin-top: -10px;
          }
          
          .details {
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            margin-top: 50px;
          }
          
          .col {
            display: flex;
            align-items: center;
            text-align: center;
          }
          
          .col img {
            width: 40px;
            margin-right: 10px;
          }
          
          .humidity,
          .wind {
            font-size: 28px;
            margin-top: -6px;
          }
          
          .weather-none {
            display: none;
          }
          
          .error {
            text-align: left;
            margin-left: 10px;
            font-size: 14px;
            margin-top: 10px;
            display: none;
          }
    `;

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    style.atta;
    console.log("Button style created :)");
  };

  const setEvents = () => {
    console.log("setEvents");
    document.querySelector(".kuramBtn").addEventListener("click", function () {
      document.getElementById("myPopup").style.display = "flex";
    });

    document.querySelector(".closeBtn").addEventListener("click", function () {
      document.getElementById("myPopup").style.display = "none";
    });

    document
      .querySelector(".search input")
      .addEventListener("input", function (event) {
        const value = event.target.value;
        chrome.runtime.sendMessage({ action: "updateSearchValue", value });
      });

    document.getElementById("button").addEventListener("click", function () {
      const searchBox = document.querySelector(".search input");
      const value = searchBox.value;
      const response = chrome.runtime.sendMessage({
        action: "sendApiData",
        data: value,
      });
      console.log(response);
    });
    var clickCount = 0;
    if (clickCount == 0) {
      document.querySelector(".weather").style.display = "none";
    }
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "handleApiResponse") {
        const searchBox = document.querySelector(".search input");
        const value = searchBox.value;
        clickCount++;
        const apiResponse = request.responseData;
        console.log(apiResponse);
        if (apiResponse?.cod != 200 || value == "") {
          document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none";
        } else {
          document.querySelector(".error").style.display = "none";
          document.querySelector(".weather").style.display = "flex";

          const weatherIcon = document.querySelector(".weather-icon");
          document.getElementById("city").innerHTML = apiResponse?.name;
          document.getElementById("temp").innerHTML =
            apiResponse?.main?.temp + " C";
          document.getElementById("humidity").innerHTML =
            apiResponse?.main?.humidity + " %";
          document.getElementById("wind").innerHTML =
            apiResponse?.wind?.speed + " km/h";
          if (apiResponse?.weather[0]?.main == "Clouds") {
            weatherIcon.src = `${chrome.runtime.getURL("assets/clouds.png")}`;
          } else if (apiResponse?.weather[0]?.main == "Clear") {
            weatherIcon.src = `${chrome.runtime.getURL("assets/clear.png")}`;
          } else if (apiResponse?.weather[0]?.main == "Rain") {
            weatherIcon.src = `${chrome.runtime.getURL("assets/rain.png")}`;
          } else if (apiResponse?.weather[0]?.main == "Drizzle") {
            weatherIcon.src = `${chrome.runtime.getURL("assets/drizzle.png")}`;
          } else if (apiResponse?.weather[0]?.main == "Mist") {
            weatherIcon.src = `${chrome.runtime.getURL("assets/mist.png")}`;
          } else {
            weatherIcon.src = "icon.png";
          }
        }
      }
    });
  };

  buildHTML();
  buildCSS();
  setEvents();
})();

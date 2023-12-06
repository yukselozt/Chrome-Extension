chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendApiData") {
    const apiData = request.data;
    const apiUrl = "https://api.openweathermap.org/data/2.5/";
    const apiKey = "8a42062e71cb47b6b3260ac9fb75d934";
    const query = `${apiUrl}weather?q=${apiData}&appid=${apiKey}&units=metric`;
    // API isteği gönder
    fetch(query)
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log(apiResponse);
        // API'den gelen yanıtı content.js'e mesajla gönder
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "handleApiResponse",
              responseData: apiResponse,
            });
          }
        );
      })
      .catch((error) => console.error("API isteği başarısız:", error));
  }
});

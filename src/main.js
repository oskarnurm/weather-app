import "./style.css";
import { iconMap } from "./icons.js";
import { getWeather } from "./api.js";

const resultsDiv = document.querySelector(".results");
const iconContainer = document.querySelector(".icon-container");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search");
const imgElement = document.createElement("img");

async function displayWeather(city) {
  resultsDiv.textContent = "Loading...";
  try {
    const [temp, icon, addr, timezone, conditions] = await getWeather(city);
    const timezone_clean = timezone.trim().replace("_", " ");
    const iconURL = iconMap[icon] || iconMap["default"];

    imgElement.src = iconURL;
    imgElement.alt = iconURL;
    imgElement.width = 100;
    imgElement.height = 100;
    iconContainer.appendChild(imgElement);

    resultsDiv.textContent = `
Temperature: ${temp}°C
Conditions: ${conditions}
Address: ${addr}
Timezone: ${timezone_clean}`;
  } catch (error) {
    resultsDiv.textContent = `Hmm, I don't know this place...maybe try again?`;
    console.error(error);
  }
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value;
    displayWeather(city);
  }
});

searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  displayWeather(city);
});

displayWeather("Stockholm");

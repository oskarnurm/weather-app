import "./style.css";
import { iconMap } from "./icons.js";
import { getWeather } from "./api.js";

const resultsDiv = document.querySelector(".results");
const iconContainer = document.querySelector(".icon-container");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search");

const imgElement = document.createElement("img");

async function displayWeather(city) {
  try {
    const [temp, icon, addr, timezone] = await getWeather(city);
    const iconURL = iconMap[icon] || iconMap["default"];

    imgElement.src = iconURL;
    imgElement.alt = iconURL;
    imgElement.width = 100;
    imgElement.height = 100;

    iconContainer.appendChild(imgElement);

    resultsDiv.textContent = `Temperature: ${temp}, ${icon}, ${addr}, ${timezone}`;
  } catch (error) {
    resultsDiv.textContent = `Error fetching weather: ${error.message}`;
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

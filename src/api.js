export async function getWeather(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=EHV3FH5TPX5J4UWWFJMH2Z86Z`,
  );
  const data = await response.json();
  console.log(data);
  const temp = data.currentConditions.temp;
  const icon = data.currentConditions.icon;
  const resolvedAddress = data.resolvedAddress;
  const timezone = data.timezone;
  return [temp, icon, resolvedAddress, timezone];
}

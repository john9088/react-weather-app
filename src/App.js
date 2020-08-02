import React, { useState } from "react";

let appClassName = "App";
const api = {
  key: "6e2db6ec7b134042baae6dab408be97c",
  base: "https://api.openweathermap.org/data/2.5/",
};
const App = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  // console.log(query);
  let climate;

  const search = async (evt) => {
    if (evt.key === "Enter") {
      const response = await fetch(
        `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
      );
      // console.log(response);
      const data = await response.json();
      const temp = data.weather[0].main;
      climate =
        temp === "Rain" ||
        temp === "Clear" ||
        temp === "Clouds" ||
        temp === "Haze"
          ? temp
          : "Sunny";

      appClassName = "App";
      // console.log(climate.includes('Rain'));
      if (climate.includes("Rain")) appClassName = appClassName.concat(" rain");
      else if (climate.includes("Clear")) {
        appClassName = appClassName.concat(" clear");
      } else if (climate.includes("Clouds")) {
        appClassName = appClassName.concat(" clouds");
      } else if (climate.includes("Haze")) {
        appClassName = appClassName.concat(" haze");
      }
      setWeather(data);
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={appClassName}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Location..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.name !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{weather.main.temp}&#x2103;</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;

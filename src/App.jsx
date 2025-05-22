import { useState, useEffect } from "react";
// import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [unit, setUnit] = useState("C");
  const [longitude, setLongitude] = useState(75.75);
  const [latitude, setLatitude] = useState(22.66667);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [tempratureC, setTempratureC] = useState(0);
  const [tempratureF, setTempratureF] = useState(0);
  const [text, setText] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [image, setImage] = useState("");

  const getlatlong = () => {
    console.log("Calling getlatlong function: The function is not ready yet");
  };
  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(`ERROR:${error.message}`);
    }
  };

  const setValues = async () => {
    const data = await getWeather();
    setCity(data.location.name);
    setRegion(data.location.region);
    setCountry(data.location.country);
    setTempratureC(data.current.temp_c);
    setTempratureF(data.current.temp_f);
    setHumidity(data.current.humidity);
    setWindSpeed(data.current.wind_kph);
    setWindDirection(data.current.wind_dir);
    setImage(data.current.condition.icon);
    setText(data.current.condition.text);
  };

  useEffect(() => {
    setValues();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex items-center h-20 bg-navColor px-4 sm:px-8 md:px-24">
        <h1 className="text-2xl sm:text-3xl font-black text-whiteText">
          Weather Forecast
        </h1>
        <div className="ml-auto flex items-center bg-navColorLight border border-1px pl-3 pr-2 py-2 rounded-full w-full max-w-xs sm:max-w-md">
          <SearchIcon className="text-whiteText mr-2" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getlatlong(input);
              }
            }}
            placeholder="Search for a location..."
            className="bg-navColorLight text-whiteText placeholder-whiteText flex-grow outline-none border-none text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Weather card */}
      <div className="rounded-xl mt-8 mx-4 sm:mx-8 md:mx-28 bg-navColor flex flex-col md:h-2/5 p-4 md:p-6">
        {/* 1st layer */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* city and country */}
          <div className="mb-4 md:mb-0">
            <p className="text-2xl sm:text-3xl text-whiteText font-bold">{city}</p>
            <p className="text-lg sm:text-xl text-whiteText">{`${region}, ${country}`}</p>
          </div>
          <button
            onClick={() => {
              setUnit(unit === "C" ? "F" : "C");
            }}
            className="rounded-full bg-navColorLight hover:bg-navColorHover px-3 py-1 text-whiteText h-fit text-center self-start md:self-center"
          >
            {unit === "C" ? "°C to °F" : "°F to °C"}
          </button>
        </div>

        {/* 2nd layer */}
        <div className="flex flex-col md:flex-row justify-between mt-4 w-full gap-4 md:gap-0">
          {/* left div for image and temperature */}
          <div className="flex items-center gap-x-3">
            <img
              src={`${image}`}
              alt="weather icon"
              className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
            />
            <div className="text-whiteText">
              <p className="text-3xl sm:text-4xl mb-1 font-bold">
                {unit === "C" ? tempratureC + "°C" : tempratureF + "°F"}
              </p>
              <p className="text-sm sm:text-base">{text}</p>
            </div>
          </div>

          {/* right div */}
          <div className="flex flex-wrap gap-3 md:gap-6 justify-start md:justify-end">
            <button className="flex border p-2 rounded-xl bg-navColorLight text-whiteText font-medium items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
              >
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
              </svg>
              <span>
                Feels: {unit === "C" ? tempratureC + " °C" : tempratureF + " °F"}
              </span>
            </button>
            <button className="flex border p-2 rounded-xl bg-navColorLight text-whiteText font-medium items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
              >
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
              </svg>
              <span>Humidity: {humidity}%</span>
            </button>
            <button className="flex border p-2 rounded-xl bg-navColorLight text-whiteText font-medium items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
              >
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
              </svg>
              <span>
                Wind: {windSpeed} km/h {windDirection}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-auto mb-4 px-4 text-whiteText text-sm sm:text-base">
        The weather data is from WeatherAPI.com, the location is hard coded to
        Indore, would add search using google places soon, not that I am stuck it is just boring.
        <span> &copy; 2025 Adithya Sasi </span>
      </div>
    </div>
  );
}

export default App;

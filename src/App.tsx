import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import bgAstro from "./assets/bgAstro.svg";
import "./App.css";
import { getWeather } from "./helpers";

function App() {
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState<string | undefined>();

  const data = "";

  return (
    <div
      className="bgImage"
      style={{
        backgroundImage: `url(${bgAstro})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        zIndex: -1,
      }}
    >
      <section>
        {/* <button onClick={() => setCount((count) => count + 1)}>go</button> */}
        if (data)
        {
          <div>
            <h1>Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        }
      </section>

      <section>
        <h3>Weather</h3>
        <button
          onClick={async () => {
            const result = await getWeather("90008");
            setWeatherData(result);
          }}
        >
          Get Weather
        </button>
        if (weatherData)
        {
          <div>
            <h1>{weatherData}</h1>
          </div>
        }
      </section>

      {/* the old vite stuff */}
      <section>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;

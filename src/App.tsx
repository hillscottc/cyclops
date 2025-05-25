import { useState } from "react";
import { fetchChat } from "./utils/helpers";
import { getZodiacSignEmoji, ZodiacSign } from "./utils/zodiac-utils";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatResults, setChatResults] = useState("");
  const [zodiac, setZodiac] = useState("Aries");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = `Give me today's horoscope for ${zodiac}.`;

    try {
      setIsLoading(true);
      setChatResults("");
      const chatResponse = await fetchChat({ content });
      setChatResults(() => chatResponse || "");
      setIsLoading(false);
    } catch (error) {
      setChatResults(`Error: ${error}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {!isLoading && !chatResults && (
        <section className="astro">
          <form className="astro-form" onSubmit={handleSubmit}>
            <label htmlFor="zodiac-sign" className="zodiac-label">
              ✨ Zodiac Sign ✨
            </label>
            <div style={{ position: "relative", display: "inline-block" }}>
              <select
                id="zodiac-sign"
                name="zodiac-sign"
                defaultValue="Aries"
                onChange={(e) => setZodiac(e.target.value)}
                required
              >
                {Object.values(ZodiacSign).map((sign) => (
                  <option key={sign} value={sign}>
                    {getZodiacSignEmoji(sign)}
                  </option>
                ))}
              </select>
              <span className="pulldown-pointer" aria-hidden="true">
                ▼
              </span>
            </div>
            <button className="form-button" type="submit">
              Consult the Stars
            </button>
          </form>
        </section>
      )}

      {isLoading && (
        <section>
          <div>Thinking...</div>
        </section>
      )}

      {chatResults && (
        <section>
          <div className="zodiac-sign">{getZodiacSignEmoji(zodiac)}</div>
          <div>{chatResults}</div>
          <div style={{ marginTop: "1rem" }}>
            <button className="form-button" onClick={() => setChatResults("")}>
              Inquire Again
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;

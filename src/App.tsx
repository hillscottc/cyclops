import { useState } from "react";
import { fetchChat } from "./utils/helpers";
import {
  getRandomNarrative,
  getZodiacSignEmoji,
  Narrative,
  ZodiacSign,
} from "./utils/zodiac-utils";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatResults, setChatResults] = useState("");
  const [zodiac, setZodiac] = useState("Aries");
  const [narrative, setNarrative] = useState<Narrative>(Narrative.General);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = `Give me today's horoscope for ${zodiac} ${
      narrative != Narrative.General ? `in the context of ${narrative}` : ""
    }.`;

    // console.log("Content to send:", content);

    try {
      setChatResults("");

      setIsLoading(true);
      // pause for a moment to simulate thinking
      await new Promise((resolve) => setTimeout(resolve, 6000));

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
      <div style={{ flex: 1 }}>
        {!isLoading && !chatResults && (
          <section className="astro">
            <form className="astro-form" onSubmit={handleSubmit}>
              <label htmlFor="zodiac-sign" className="zodiac-label">
                ✨ Zodiac ✨
              </label>
              <div style={{ position: "relative", display: "inline-block" }}>
                {/* Sign */}

                <div className="pulldown-container">
                  <div>
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
                    <span className="pulldown-pointer">▼</span>
                  </div>
                </div>

                {/* Narrative */}
                <div className="pulldown-container">
                  <div>
                    <select
                      id="narrative"
                      name="narrative"
                      defaultValue={Narrative.General}
                      onChange={(e) =>
                        setNarrative(e.target.value as Narrative)
                      }
                      required
                    >
                      {Object.values(Narrative).map((narrative) => (
                        <option key={narrative} value={narrative}>
                          {narrative}
                        </option>
                      ))}
                    </select>
                    <span className="pulldown-pointer">▼</span>
                  </div>
                </div>
              </div>
              <button className="form-button" type="submit">
                Consult the Stars
              </button>
            </form>
          </section>
        )}

        {isLoading && (
          <section>
            <div className="chatResults">
              {getRandomNarrative(narrative)}
              <p>Thinking...</p>
            </div>
          </section>
        )}

        {chatResults && (
          <section>
            <div className="resultsHeading">✨the stars reveal...✨</div>
            <div className="zodiac-sign">{getZodiacSignEmoji(zodiac)}</div>
            <div className="chatResults">{chatResults}</div>

            <div style={{ marginTop: "1rem" }}>
              <button
                className="form-button"
                onClick={() => setChatResults("")}
              >
                Inquire Again
              </button>
            </div>

            <div className="save-button-container">
              <button
                onClick={() => {
                  const blob = new Blob([chatResults], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${zodiac}-horoscope.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Save Horoscope
              </button>
            </div>
          </section>
        )}
      </div>

      <footer>
        <a href="https://en.wikipedia.org/wiki/Astrology" target="_blank">
          astrology
        </a>
        &nbsp; © {new Date().getFullYear()} by Scott C Hill,&nbsp;
        <a href="https://github.com/hillscottc/cyclops" target="_blank">
          source code
        </a>
      </footer>
    </div>
  );
}

export default App;

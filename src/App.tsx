import { useState } from "react";
import "./App.css";
import { fetchChat } from "./helpers";

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
      <section className="astro">
        <form className="astro-form" onSubmit={handleSubmit}>
          <label htmlFor="zodiac-sign">Zodiac Sign</label>
          <select
            id="zodiac-sign"
            name="zodiac-sign"
            defaultValue="Aries"
            onChange={(e) => setZodiac(e.target.value)}
          >
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            <option value="Gemini">Gemini</option>
            <option value="Cancer">Cancer</option>
            <option value="Leo">Leo</option>
            <option value="Virgo">Virgo</option>
            <option value="Libra">Libra</option>
            <option value="Scorpio">Scorpio</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Capricorn">Capricorn</option>
            <option value="Aquarius">Aquarius</option>
            <option value="Pisces">Pisces</option>
          </select>
          <button type="submit">Consult the Stars</button>
        </form>
      </section>

      {chatResults && (
        <section>
          {isLoading && <div>Thinking...</div>}

          <div>{chatResults}</div>
        </section>
      )}
    </div>
  );
}

export default App;

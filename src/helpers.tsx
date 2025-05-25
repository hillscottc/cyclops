import { useState, useEffect } from "react";
import OpenAI from "openai";

export const API_KEY = import.meta.env.VITE_OPENAI_SECRET || "";

/* https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety */
export async function fetchChat({
  content = "Tell me a joke",
}: {
  content: string;
}): Promise<string | null> {
  const client = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
    temperature: 0.8,
    max_tokens: 1024,
  });
  return response.choices[0]?.message?.content;
}

/**
 * Custom hook to fetch data from a given URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {object} An object containing the fetched data, loading state, and error state.
 */
export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) setData(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

/**
 * Get the weather for a given zip code using Open Meteo API.
 * @param {string} zip - The zip code to get the weather for.
 * @returns {Promise<string>} The weather information for the given zip code.
 */
export async function getWeather(zip: string): Promise<string> {
  const logger = console; // Replace with a different logger if needed

  // Geocoding API request to get the latitude, longitude, and city for given zip code
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${zip}`;
  try {
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData: {
      results?: Array<{
        latitude: number;
        longitude: number;
        admin1?: string;
        admin2?: string;
      }>;
    } = await geocodingResponse.json();

    if (
      geocodingData &&
      geocodingData.results &&
      geocodingData.results.length > 0
    ) {
      const { latitude, longitude, admin1, admin2 } = geocodingData.results[0];

      // Weather API request by lat/long
      let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;
      weatherUrl += "&temperature_unit=fahrenheit&current=temperature_2m,rain";
      const weatherResponse = await fetch(weatherUrl);
      const weatherData: {
        current: {
          temperature_2m: number;
          rain: number;
        };
        location?: string;
      } = await weatherResponse.json();

      // add the location to the data
      weatherData.location = `${admin2 ?? ""}, ${admin1 ?? ""}`;
      const weatherResults = `In ${weatherData.location}, the current temperature is ${weatherData.current.temperature_2m}°F, and rain is ${weatherData.current.rain} inches.`;
      logger.info(`Weather for ${zip} : ${weatherResults}`);
      return weatherResults;
    } else {
      const weatherResults = `Could not get weather for zip ${zip}`;
      logger.info(`Weather for ${zip} : ${weatherResults}`);
      return weatherResults;
    }
  } catch (e) {
    const err = `Error getting weather: ${e}`;
    logger.error(err);
    const weatherResults = `Could not get weather for zip ${zip}`;
    return weatherResults;
  }
}

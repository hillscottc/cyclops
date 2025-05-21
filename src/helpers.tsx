// hello
import { useState, useEffect } from "react";

/**
 * Generate a URL for fetching horoscope data from 'horoscope-app-api.vercel.app' api
 * @param {string} kind - The type of horoscope (e.g., "daily", "weekly").
 * @param {string} when - The time for the horoscope (e.g., "TODAY", "TOMORROW").
 * @param {string} sign - The zodiac sign (e.g., "Leo").
 * @returns {string} The generated URL for fetching horoscope data.
 */
export function makeHoroscopeUrl(
  kind: string = "daily",
  when: string = "TODAY",
  sign: string = "Leo"
) {
  const baseUrl =
    import.meta.env.VITE_HOROSCOPE_URL ||
    "https://horoscope-app-api.vercel.app/api/v1/get-horoscope";
  if (!baseUrl) {
    throw new Error("VITE_HOROSCOPE_URL is not defined");
  }
  return `${baseUrl}/${kind}?sign=${sign}&when=${when}`;
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

/**
 * Get the zodiac sign for a given date.
 * @param {Date} date - The date to get the zodiac sign for.
 * @returns {string} The zodiac sign for the given date.
 */
export function getZodiacSign(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1; // JS months are 0-based

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius";
  return "Capricorn";
}

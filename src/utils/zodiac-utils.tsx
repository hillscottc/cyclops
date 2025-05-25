export const ZodiacSign = {
  Aries: "Aries",
  Taurus: "Taurus",
  Gemini: "Gemini",
  Cancer: "Cancer",
  Leo: "Leo",
  Virgo: "Virgo",
  Libra: "Libra",
  Scorpio: "Scorpio",
  Sagittarius: "Sagittarius",
  Capricorn: "Capricorn",
  Aquarius: "Aquarius",
  Pisces: "Pisces",
} as const;

export type ZodiacSign = (typeof ZodiacSign)[keyof typeof ZodiacSign];

/**
 * Returns the emoji representation of a zodiac sign.
 * @param {string} zodiac - The name of the zodiac sign.
 * @returns {string} The emoji and name of the zodiac sign.
 */
export function getZodiacSignEmoji(zodiac: string): string {
  const zodiacEmojis: { [key: string]: string } = {
    Aries: "♈",
    Taurus: "♉",
    Gemini: "♊",
    Cancer: "♋",
    Leo: "♌",
    Virgo: "♍",
    Libra: "♎",
    Scorpio: "♏",
    Sagittarius: "♐",
    Capricorn: "♑",
    Aquarius: "♒",
    Pisces: "♓",
  };
  return `${zodiacEmojis[zodiac]} ${zodiac}` || "";
}

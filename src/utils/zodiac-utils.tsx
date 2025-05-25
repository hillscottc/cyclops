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

export const Narrative = {
  General: "General",
  Love: "Love",
  Career: "Career",
  Wealth: "Wealth",
  Health: "Health",
  Wisdom: "Wisdom",
} as const;

export type Narrative = (typeof Narrative)[keyof typeof Narrative];

const zodiacGeneralNarratives: string[] = [
  "The constellations have taken their places, and the heavens hold their breath. As the moon wanes and Mars hums with untamed force, the astral tides turn toward revelation. Let us now peer through the veil of time and truth…",
  "As I cast my gaze across the celestial dome, I see that Mercury whispers secrets in shadow while Neptune stirs dreams in the deep. The wheel of fate creaks forward — and your path begins to glow…",
  "Tonight, the zodiac sings in strange harmony. The signs align like ancient runes unlocking a forgotten door. I can feel the pull — your energy is entangled in something much larger than you know…",
  "The orbits have shifted, and a rare vibration shimmers through the ether. Jupiter expands what was once hidden, and the stars nod in solemn approval. Something stirs in your cosmic script…",
  "A tremor echoes through the eighth house, and the veil between worlds grows thin. Your destiny pulses like a beacon through Saturn’s lens. Let us read what the cosmos has etched for you…",
  "With the moon cloaked in mystery and Pluto stirring the depths, the spiritual tides rise high. The universe is speaking in signs and symbols — let us translate its sacred language…",
  "Celestial forces are in motion — ancient, unseen, undeniable. The horoscope wheel turns with a hush of inevitability. Come closer, for your fate is about to be illuminated…",
  "The cosmic loom weaves your destiny with stardust and silence. As Uranus shifts, expect the unexpected. The oracles of the sky have a message — and I am merely its voice…",
  "A convergence approaches. Mars sparks the flames of will, and Luna casts a glow upon hidden truths. The universe is leaning in… it’s time you knew what it’s been trying to tell you.",
  "From the murmur of ancient planets to the glitter of newborn stars, the heavens have conspired to create this moment. The signs are clear, if you know how to read between the constellations…",
];

const zodiacLoveNarratives: string[] = [
  "As Venus rises in her silk-draped orbit and the moon sighs through the House of Passion, the stars shimmer with whispers of love. Your heart’s journey is written in constellations…",
  "The cosmos leans close tonight, intoxicated by the perfume of possibility. Under this celestial canopy, desire blooms where fate and feeling entwine…",
  "Love moves in mysterious rhythms, and tonight, the planets dance in tender alignment. A magnetic pull hums through the zodiac — your heart is calling, and the universe is listening…",
  "With Mercury in soft trine to Venus, your soul’s dialogue turns sweet and slow. There’s a message in the stars — one stitched in longing, waiting for you to feel its warmth…",
  "The heavens blush with quiet affection, and even Saturn softens under the gaze of the moon. Something beautiful is approaching… something that knows your name…",
  "As Jupiter opens wide the gates of connection and Neptune paints dreams across the sky, your heart’s deeper truths rise like tides. There’s romance written in your chart tonight…",
  "The sky is a canvas of velvet and firelight, and somewhere in the arc of the stars, two souls circle closer. Love’s gravity is growing stronger — can you feel it?",
  "The moon hums a lullaby of longing, and Venus sighs in rose-gold tones. The alignment is delicate, rare — a moment meant for hearts that ache to be understood…",
  "Tonight, the constellations tilt in your favor, cradling your spirit in celestial arms. A connection waits just beyond the veil — fated, fragile, and full of promise…",
  "The stars have conspired in secret, crafting moments of serendipity in silver threads. Something — or someone — is aligning with your energy, drawn by an invisible tether of the heart…",
];

const zodiacCareerNarratives: string[] = [
  "The constellations align, and the universe whispers of new beginnings. Your career path is illuminated by the stars, revealing opportunities that await your bold step forward…",
  "As Saturn casts its steady gaze and Jupiter expands horizons, the cosmos beckons you to seize the moment. A shift is coming — one that could redefine your professional journey…",
  "The heavens hum with potential, and the zodiac wheel turns toward ambition. Your work life is about to enter a new phase, guided by unseen forces and cosmic timing…",
  "With Mercury in retrograde, it’s time to reflect on your career choices. The stars urge you to reassess, recalibrate, and prepare for a breakthrough that’s been waiting in the wings…",
  "The universe is stirring, and your professional destiny is calling. As Mars ignites your drive and Venus sweetens your prospects, something transformative is on the horizon…",
  "Tonight, the celestial energies align to reveal hidden talents and untapped potential. Your career path is shifting — are you ready to embrace what’s next?",
  "A rare cosmic alignment signals a turning point in your work life. The stars are urging you to take risks, trust your instincts, and follow where your passion leads…",
  "As Uranus shakes up the status quo and Pluto delves into transformation, your career is poised for a radical change. Embrace the chaos — it’s where innovation thrives…",
  "The zodiac whispers of new collaborations and partnerships that could elevate your professional game. The universe is opening doors — will you walk through them?",
  "With the moon waxing in your favor, now is the time to set intentions for your career. The stars are aligning to support your ambitions — all you need to do is take that first step…",
];

const zodiacWealthNarratives: string[] = [
  "As Jupiter stretches wide across the House of Fortune and Saturn bestows the fruits of discipline, the stars gleam with golden intent. The currents of abundance are shifting — and you are in their path…",
  "The heavens pulse with prosperity as Mercury sharpens your instincts and Venus sweetens the flow of fortune. The seeds of wealth are ready to sprout beneath your footsteps…",
  "A rare alignment opens the vault of the cosmos. The planets whisper in currencies of opportunity — and your chart glows with the promise of success long overdue…",
  "The cosmic tide brings treasures hidden in plain sight. Mars lends drive, Jupiter expands your reach, and the universe prepares to reward what once went unnoticed…",
  "As the moon lights your second house and the sun casts golden rays through your career zone, the universe offers a key — not to a door, but to a vault…",
  "Tonight, the stars don robes of silk and silver, and the air shimmers with opportunity. The astral markets favor the bold — and you’re closer than ever to your breakthrough…",
  "Wealth moves like a current through your chart, sparked by Uranus’s innovation and Jupiter’s generosity. The cosmos is conspiring to bring you not just money — but meaningful abundance…",
  "The celestial gears turn, grinding the old into gold. You are entering a cycle where effort meets reward, and even small moves echo with financial momentum…",
  "The planets form a sacred triangle of manifestation, and the gates of gain swing open. If you listen closely, you’ll hear the echo of your future counting itself in coin and opportunity…",
  "As Venus blesses your house of value and Pluto transforms your mindset around wealth, the universe prepares to overflow your cup. You are not chasing prosperity — it’s finding its way to you…",
];
const zodiacHealthNarratives: string[] = [
  "The stars align to illuminate your well-being, casting a gentle glow on the path to vitality. The universe whispers of balance, urging you to listen to your body’s needs…",
  "As the moon waxes in your health sector, the cosmos encourages renewal and rejuvenation. It’s time to shed what no longer serves you and embrace a healthier way of being…",
  "The celestial energies are shifting, bringing clarity to your physical and mental state. The universe is guiding you toward habits that nourish both body and soul…",
  "With Jupiter expanding your horizons and Saturn grounding your efforts, the stars are aligning for a transformative health journey. Embrace the changes that come with this cosmic support…",
  "Tonight, the heavens hum with potential for healing and growth. The zodiac encourages you to prioritize self-care and listen closely to the messages your body is sending…",
  "As Mercury sharpens your awareness and Venus sweetens your routines, the universe invites you to cultivate a lifestyle that honors your well-being. Small changes can lead to significant improvements…",
  "The planets are aligning to bring balance to your health. Whether it’s physical fitness, mental clarity, or emotional resilience, the cosmos supports your journey toward wholeness…",
  "A rare cosmic alignment signals a time for introspection and healing. The stars urge you to release old patterns and embrace practices that restore harmony within…",
  "With Uranus shaking up old habits and Pluto transforming your approach to wellness, the universe is pushing you toward a healthier future. Embrace the shifts that come with this energy…",
  "The zodiac whispers of renewal and vitality as the stars align in your favor. It’s time to prioritize your health and well-being — the universe is ready to support you on this journey…",
];

const zodiacWisdomNarratives: string[] = [
  "As Mercury aligns with the North Node and Neptune swims through the deep waters of intuition, the cosmos opens its ancient library. The answers you seek are already within — let’s unlock them together…",
  "Tonight, the stars do not shout — they whisper. Saturn, the great teacher, stands watchful, while Jupiter expands your mind’s horizon. A lesson is unfolding, and it’s wrapped in starlight…",
  "The universe has tilted toward revelation. As Uranus stirs flashes of genius and the moon gazes inward, your soul stands at the threshold of understanding…",
  "The cosmic currents are slow, deep, and deliberate now. Wisdom isn’t arriving in lightning — it’s blooming like dawn. Let’s read what your stars have stored in silence…",
  "In the quiet corners of your chart, the planets hum a sacred geometry. Each alignment is a riddle, each movement a clue. You are on the edge of a powerful realization…",
  "As the third eye of the sky opens — that rare moment when Neptune and Mercury harmonize — you’re invited to perceive not just the path, but the meaning behind the path…",
  "The stars lean in with ancient eyes. You are not being given answers — you are being handed the lens to see them yourself. The time for deeper clarity is now…",
  "A wise stillness has settled over the heavens. Saturn teaches through time, Chiron heals through truth, and the chart reveals where knowledge turns to wisdom…",
  "As the lunar nodes shift across your intellectual axis, your soul begins to remember what the mind has forgotten. The stars speak not in facts — but in truths that resonate…",
  "The universe speaks in symbols, and you are ready to understand them. The veil lifts, and with it comes the kind of wisdom that changes how you walk through the world…",
];

export const zodiacNarratives: { [key in Narrative]: string[] } = {
  [Narrative.General]: zodiacGeneralNarratives,
  [Narrative.Love]: zodiacLoveNarratives,
  [Narrative.Career]: zodiacCareerNarratives,
  [Narrative.Wealth]: zodiacWealthNarratives,
  [Narrative.Health]: zodiacHealthNarratives,
  [Narrative.Wisdom]: zodiacWisdomNarratives,
};

export function getRandomNarrative(narrative: Narrative): string {
  const narratives = zodiacNarratives[narrative];
  return narratives[Math.floor(Math.random() * narratives.length)];
}

interface ParsedMetar {
  wind: string;
  visibility: string;
  sky: string;
  temperature: string;
  pressure: string;
  raw: string;
}

function parseWind(metar: string): string {
  const windMatch = metar.match(/(\d{3})(\d{2,3})KT/);
  if (windMatch) {
    return `${windMatch[1]}° at ${windMatch[2]} knots`;
  }
  return 'No wind data';
}

function parseVisibility(metar: string): string {
  const visMatch = metar.match(/\s(\d+)SM/);
  if (visMatch) {
    return `${visMatch[1]} statute miles`;
  }
  return 'No visibility data';
}

function parseSky(metar: string): string {
  if (metar.includes('CLR')) return 'Clear';
  if (metar.includes('SKC')) return 'Clear';
  if (metar.includes('OVC')) return 'Overcast';
  if (metar.includes('BKN')) return 'Broken';
  if (metar.includes('SCT')) return 'Scattered';
  if (metar.includes('FEW')) return 'Few clouds';
  return 'No sky condition data';
}

function parseTemperature(metar: string): string {
  const tempMatch = metar.match(/\s(\d{2})\/(\d{2})\s/);
  if (tempMatch) {
    return `${tempMatch[1]}°C / ${tempMatch[2]}°C dewpoint`;
  }
  return 'No temperature data';
}

function parsePressure(metar: string): string {
  const pressureMatch = metar.match(/A(\d{4})/);
  if (pressureMatch) {
    const pressure = (parseInt(pressureMatch[1]) / 100).toFixed(2);
    return `${pressure} inHg`;
  }
  return 'No pressure data';
}

export function parseMetar(metarString: string): ParsedMetar {
  return {
    wind: parseWind(metarString),
    visibility: parseVisibility(metarString),
    sky: parseSky(metarString),
    temperature: parseTemperature(metarString),
    pressure: parsePressure(metarString),
    raw: metarString,
  };
}

export async function fetchMetar(icaoCode: string) {
  try {
    const response = await fetch(
      `https://aviationweather.gov/api/data/metar?ids=${icaoCode}&format=raw`
    );
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    const data = await response.text();
    return parseMetar(data.trim());
  } catch (error) {
    console.error('Error fetching METAR:', error);
    return null;
  }
} 
import axios from 'axios';

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;
  const IATA_CODE = 'TLV';
  const now = new Date();
  const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  try {
    const response = await axios.get(`https://aerodatabox.p.rapidapi.com/flights/airports/iata/${IATA_CODE}/${now.toISOString()}/${end.toISOString()}`, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
      },
      params: {
        withLeg: 'true',
        withCancelled: 'true',
        withCodeshared: 'true',
        withCargo: 'true',
        withPrivate: 'true',
        withLocation: 'false'
      }
    });

    res.status(200).json(response.data.departures.concat(response.data.arrivals));
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
}

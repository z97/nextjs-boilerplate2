import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('/api/flights');
        setFlights(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flights');
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Flights from/to Ben Gurion Airport</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Flight</th>
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Scheduled</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.number} className="border-b">
              <td className="p-2">{flight.number}</td>
              <td className="p-2">{flight.departure.airport.name}</td>
              <td className="p-2">{flight.arrival.airport.name}</td>
              <td className="p-2">{new Date(flight.departure.scheduledTime).toLocaleString()}</td>
              <td className="p-2">{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

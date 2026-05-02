import { DetailItem, FlagImage, Modal, Table } from '@/components';
import { type CountriesResponse, type CountryResponse, COUNTRIES_ENDPOINT, COUNTRY_ENDPOINT } from '@/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const App = () => {
  const [countries, setCountries] = useState<CountriesResponse | null>(null);
  const [country, setCountry] = useState<CountryResponse | null>(null);

  useEffect(() => {
    fetch(COUNTRIES_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status}`);
        }
        return response.json();
      })
      .then((data: CountriesResponse) => {
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        setCountries(sorted);
      })
      .catch((error) => {
        console.log(`${error.message} - Failed to fetch country list`);
      });
  }, []);

  const fetchCountry = async (name: string) => {
    try {
      const response = await axios.get(`${COUNTRY_ENDPOINT}/${name}?fullText=true`);

      setCountry(response.data[0]);
    } catch (error) {
      console.log(`${(error as Error).message} - Failed to fetch country details`);
    }
  };

  if (!countries) {
    return <p className="mt-10 text-center text-lg text-gray-200">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-gray-100">
      <Table headers={['Flag', 'Country']}>
        {countries.map((country) => (
          <tr
            key={country.name.common}
            className="cursor-pointer transition hover:bg-white/5"
            onClick={() => fetchCountry(country.name.common)}
          >
            <td className="border border-gray-700 px-4 py-2">
              <FlagImage src={country.flags.svg} alt={country.name.common} />
            </td>
            <td className="border border-gray-700 px-4 py-2">{country.name.common}</td>
          </tr>
        ))}
      </Table>
      {country && (
        <Modal onClick={() => setCountry(null)}>
          <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center gap-3">
              <FlagImage src={country.flags.svg} alt={country.name.common} />
              <h2 className="text-2xl font-bold">{country.name.common}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Capital" value={country.capital[0]} />
              <DetailItem label="Languages" value={Object.values(country.languages).join(', ')} />
              <DetailItem label="Region" value={country.region} />
              <DetailItem label="Subregion" value={country.subregion} />
              <DetailItem label="Area" value={`${country.area.toLocaleString()} km²`} />
              <DetailItem label="Population" value={country.population.toLocaleString()} />
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

export type CountriesResponse = Array<{
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
}>;

export type CountryResponse = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  languages: Record<string, string>;
  area: number;
};

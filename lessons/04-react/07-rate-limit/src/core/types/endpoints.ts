export type SearchResponse = {
  results: Array<{
    id: number;
    title: string;
    poster_path: string;
  }>;
  total_pages: number;
  total_results: number;
};

export type MovieResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

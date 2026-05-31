export type MovieRespsonse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: string;
  results: Array<{
    release_date?: string;
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  total_pages: number;
};

export type TvShowResponse = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: string;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type TvListResponse = {
  page: number;
  results: Array<{
    first_air_date?: string;
    id: number;
    poster_path: string;
    name: string;
    original_name: string;
  }>;
  total_pages: number;
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

// this type is used for the trailers view, which is a child of movie view. movie view already fetches the videos, so we can reuse that data yippie
export type VideosResponse = {
  results: Array<{
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
};

export type Season = {
  id: number;
  name: string;
  episode_count: number;
  poster_path: string;
  season_number: number;
  air_date?: string;
};

export type SeasonsResponse = {
  seasons: Season[];
};

export type Episode = {
  id: number;
  name: string;
  episode_number: number;
  overview: string;
  still_path: string;
  air_date: string;
  vote_average: number;
};

export type EpisodesResponse = {
  episodes: Episode[];
};

export type PersonResponse = {
  id: number;
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
  deathday: string | null;
  known_for_department: string;
  place_of_birth: string;
};

// combined credits response for an actor
//media_type tells us whether a role is movie or TV.
export type PersonCast = {
  id: number;
  character: string;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
};

export type CareerResponse = {
  cast: PersonCast[];
};

export type PersonImage = {
  file_path: string;
  vote_average: number;
};

export type ImagesResponse = {
  profiles: PersonImage[];
};

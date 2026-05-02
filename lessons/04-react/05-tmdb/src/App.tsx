import { DetailItem, ImageGrid, Modal } from '@/components';
import { getImageUrl, type ImageCell, MOVIE_ENDPOINT, type MovieResponse, NOW_PLAYING_ENDPOINT, type NowPlayingResponse } from '@/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState<NowPlayingResponse | null>(null);
  const [movie, setMovie] = useState<MovieResponse | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<NowPlayingResponse>(`${NOW_PLAYING_ENDPOINT}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);

        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const fetchMovie = async (id: number) => {
    try {
      const response = await axios.get<MovieResponse>(`${MOVIE_ENDPOINT}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);

      setMovie(response.data);
    } catch (error) {
      console.error('Failed to fetch movie details', error);
    }
  };

  const gridData: ImageCell[] = (movies?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!movies) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col border-b border-gray-700 bg-gray-900 text-white">
      <section className="mx-auto max-w-7xl space-y-5 p-5">
        <h1 className="mb-4 text-3xl font-bold">Now Playing</h1>
        <ImageGrid images={gridData} onClick={(image) => fetchMovie(image.id)} />
      </section>
      {movie && (
        <Modal onClick={() => setMovie(null)}>
          <div className="flex flex-col gap-8 p-8">
            <img className="w-50 rounded-xl object-cover" src={getImageUrl(movie.poster_path)} alt={movie.title} />
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="leading-relaxed text-gray-300">{movie.overview}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <DetailItem label="Release" value={movie.release_date} />
                <DetailItem label="Rating" value={movie.vote_average} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

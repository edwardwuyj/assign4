import { MOVIE_ENDPOINT, type VideosResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const { data } = useTmdb<VideosResponse>(`${MOVIE_ENDPOINT}/${id}/videos`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const allTrailers = data.results.filter((video) => video.site === 'YouTube');

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">All Trailers</h2>
      {allTrailers.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allTrailers.map((trailer) => (
            <a
              key={trailer.key}
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg bg-gray-800 p-4 shadow transition hover:bg-gray-700"
            >
              <img
                src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
                alt={trailer.name}
                className="mb-3 h-40 w-full rounded object-cover transition group-hover:scale-105"
              />
              <p className="text-sm font-semibold text-gray-200">{trailer.name}</p>
              <p className="text-xs text-gray-400">{trailer.type}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No trailers available.</p>
      )}
    </section>
  );
};

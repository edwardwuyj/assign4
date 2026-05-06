import { TV_ENDPOINT, type EpisodesResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

// EpisodeView loads one TV season and displays each episode for that season
// uses the season number from the route params and renders episode details.
export const EpisodeView = () => {
  const { id, season } = useParams();
  const { data } = useTmdb<EpisodesResponse>(`${TV_ENDPOINT}/${id}/season/${season}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Season {season} Episodes</h2>
      {data.episodes.length ? (
        <div className="space-y-4">
          {data.episodes.map((episode) => (
            <div key={episode.id} className="rounded-lg border border-gray-700 bg-gray-900 p-4 transition hover:border-gray-500">
              <div className="flex gap-4">
                {episode.still_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
                    alt={episode.name}
                    className="h-32 w-auto rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold">
                    Episode {episode.episode_number}: {episode.name}
                  </h3>
                  <p className="text-sm text-gray-400">{episode.air_date}</p>
                  <p className="mt-2 text-sm text-gray-300">{episode.overview}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm">{episode.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No episodes available.</p>
      )}
    </section>
  );
};

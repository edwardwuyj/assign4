import { useStore } from '@/hooks';
import type { ChangeEvent } from 'react';

export const SettingsView = () => {
  const { username, setUsername, genrePreferences, setGenrePreferences } = useStore();

  // runs whenever username change, saves to localstorage and updates state
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // takes type movies or tv and genre value, checks if genre is already in preferences, if it is remove it, if not add it, then update state and localstorage
  const toggleGenre = (type: 'movies' | 'tv', genre: string) => {
    const current = genrePreferences[type];
    const updated = current.includes(genre) ? current.filter((item) => item !== genre) : [...current, genre];
    setGenrePreferences({ ...genrePreferences, [type]: updated });
  };

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-5">
        <label className="block text-sm font-semibold text-gray-200">Username</label>
        <div className="flex gap-2">
          <input
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your name"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-5">
        <h2 className="text-xl font-bold">Genre Preferences</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(['movies', 'tv'] as const).map((type) => {
            const options =
              type === 'movies'
                ? [
                    { label: 'Action', value: 'action' },
                    { label: 'Adventure', value: 'adventure' },
                    { label: 'Animation', value: 'animation' },
                    { label: 'Crime', value: 'crime' },
                    { label: 'Family', value: 'family' },
                    { label: 'Fantasy', value: 'fantasy' },
                    { label: 'History', value: 'history' },
                    { label: 'Horror', value: 'horror' },
                    { label: 'Mystery', value: 'mystery' },
                    { label: 'Sci-Fi', value: 'scifi' },
                  ]
                : [
                    { label: 'Action', value: 'action' },
                    { label: 'Animation', value: 'animation' },
                    { label: 'Comedy', value: 'comedy' },
                    { label: 'Crime', value: 'crime' },
                    { label: 'Documentary', value: 'documentary' },
                    { label: 'Drama', value: 'drama' },
                    { label: 'Family', value: 'family' },
                    { label: 'Kids', value: 'kids' },
                    { label: 'Mystery', value: 'mystery' },
                    { label: 'Sci-Fi', value: 'scifi' },
                  ];

            return (
              <div key={type} className="space-y-3">
                <h3 className="font-semibold text-white capitalize">{type}</h3>
                <div className="flex flex-wrap gap-2">
                  {options.map((genre) => {
                    const active = genrePreferences[type].includes(genre.value);
                    return (
                      <button
                        key={genre.value}
                        type="button"
                        className={`rounded-full border px-3 py-2 text-sm transition ${
                          active ? 'border-blue-400 bg-blue-500 text-white' : 'border-gray-700 bg-gray-800 text-gray-200'
                        }`}
                        onClick={() => toggleGenre(type, genre.value)}
                      >
                        {genre.label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-400">
                  Saved genres:{' '}
                  {options
                    .filter((genre) => genrePreferences[type].includes(genre.value))
                    .map((genre) => genre.label)
                    .join(', ') || 'None'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

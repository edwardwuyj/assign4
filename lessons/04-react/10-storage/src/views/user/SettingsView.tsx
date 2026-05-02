import { Button } from '@/components';
import { useUserContext } from '@/hooks';
import { useState } from 'react';

export const SettingsView = () => {
  const { userName, setUserName } = useUserContext();
  const [value, setValue] = useState(userName);
  const [error, setError] = useState('');

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div>
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-gray-400">Update your display name</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Username</label>
          <input
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);

              if (error) {
                setError('');
              }
            }}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setValue(userName)} variant="grey">
            Reset
          </Button>
          <Button
            onClick={() => {
              const trimmed = value.trim();

              if (!trimmed) {
                setError('Username cannot be empty');
                return;
              }

              setUserName(trimmed);
              setError('');
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </section>
  );
};

import { NumberInput, TextInput } from '@/components';
import { solveQuadratic, type Results } from '@/core';
import { useState, type SyntheticEvent } from 'react';

export const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [results, setResults] = useState<Results | null>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResults(solveQuadratic(a, b, c));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
        <h1 className="mb-4 text-center text-3xl font-bold">Quadratic Solver</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <NumberInput label="a-value:" value={a} setValue={setA} />
          <NumberInput label="b-value:" value={b} setValue={setB} />
          <NumberInput label="c-value:" value={c} setValue={setC} />
          <TextInput label="Roots:" value={results?.roots ?? 'N/A'} color="text-green-300" />
          <TextInput label="Discriminant:" value={results?.discriminant ?? 'N/A'} color="text-yellow-300" />
          <TextInput label="Number of Roots:" value={results?.type ?? 'N/A'} color="text-blue-300" />
          <TextInput label="Vertex:" value={results?.vertex ?? 'N/A'} color="text-purple-300" />
          <TextInput label="Axis of Symmetry:" value={results?.axis ?? 'N/A'} color="text-pink-300" />
          <input type="submit" value="Calculate" className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500" />
        </form>
      </div>
    </div>
  );
};

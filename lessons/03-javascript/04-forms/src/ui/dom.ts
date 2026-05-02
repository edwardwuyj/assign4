import type { Results } from '../core/types';

export const setResults = ({ discriminant, type, roots, vertex, axis }: Results) => {
  document.getElementById('discriminant')!.innerText = discriminant.toString();
  document.getElementById('num-roots')!.innerText = type;
  document.getElementById('result')!.innerText = roots;
  document.getElementById('vertex')!.innerText = vertex;
  document.getElementById('axis')!.innerText = axis;
};

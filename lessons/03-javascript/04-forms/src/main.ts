import { solveQuadratic } from './core/quadratic';
import { setResults } from './ui/dom';

const form = document.getElementById('quad-form') as HTMLFormElement;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const a = Number(formData.get('a'));
  const b = Number(formData.get('b'));
  const c = Number(formData.get('c'));

  const roots = solveQuadratic(a, b, c);
  setResults(roots);
});

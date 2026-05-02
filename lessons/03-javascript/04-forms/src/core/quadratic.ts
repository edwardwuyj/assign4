import { round } from '../utils/round';
import type { Results } from './types';

export const solveQuadratic = (a: number, b: number, c: number): Results => {
  const discriminant = b * b - 4 * a * c;
  const rootOne = round((-b + Math.sqrt(discriminant)) / (2 * a));
  const rootTwo = round((-b - Math.sqrt(discriminant)) / (2 * a));
  const x = -b / (2 * a);
  const y = a * x * x + b * x + c;
  const vertex = `(${round(x)}, ${round(y)})`;
  const axis = `x = ${round(x)}`;
  const results: Results = { discriminant, type: '', roots: '', vertex, axis };

  if (a === 0) {
    return {
      ...results,
      type: 'Not a quadratic',
      roots: 'N/A',
      vertex: 'N/A',
      axis: 'N/A',
    };
  } else if (discriminant < 0) {
    return {
      ...results,
      type: '0 (complex)',
      roots: 'No Real Roots',
    };
  } else if (discriminant > 0) {
    return {
      ...results,
      type: '2 (distinct)',
      roots: `x₁ = ${rootOne}, x₂ = ${rootTwo}`,
    };
  } else {
    return {
      ...results,
      type: '1 (repeated)',
      roots: `x = ${rootOne}`,
    };
  }
};

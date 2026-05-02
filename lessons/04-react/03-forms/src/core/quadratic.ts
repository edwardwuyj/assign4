import type { Results } from '@/core';
import { round } from '@/utils';

export const solveQuadratic = (a: number, b: number, c: number): Results => {
  const discriminant = b * b - 4 * a * c;
  const rootOne = round((-b + Math.sqrt(discriminant)) / (2 * a));
  const rootTwo = round((-b - Math.sqrt(discriminant)) / (2 * a));
  const x = -b / (2 * a);
  const y = a * x * x + b * x + c;
  const vertex = `(${round(x)}, ${round(y)})`;
  const axis = `x = ${round(x)}`;
  const results: Results = { discriminant: 'N/A', type: 'Not a quadratic', roots: 'N/A', vertex: 'N/A', axis: 'N/A' };

  if (a === 0) {
    return results;
  } else if (discriminant < 0) {
    return {
      discriminant: discriminant.toString(),
      type: '0 (complex)',
      roots: 'No Real Roots',
      vertex,
      axis,
    };
  } else if (discriminant > 0) {
    return {
      discriminant: discriminant.toString(),
      type: '2 (distinct)',
      roots: `x₁ = ${rootOne}, x₂ = ${rootTwo}`,
      vertex,
      axis,
    };
  } else {
    return {
      discriminant: discriminant.toString(),
      type: '1 (repeated)',
      roots: `x = ${rootOne}`,
      vertex,
      axis,
    };
  }
};

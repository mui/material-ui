export function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

export function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

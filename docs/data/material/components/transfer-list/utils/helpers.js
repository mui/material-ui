export function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

export function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export function union(a, b) {
  return [...a, ...not(b, a)];
}

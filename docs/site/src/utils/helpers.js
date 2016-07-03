export function kebabCase(string) {
  return string.split(/ |_|-/).join('-').split('').map((a, i) => {
    if (a.toUpperCase() === a && a !== '-') {
      return (i !== 0 ? '-' : '') + a.toLowerCase();
    }
    return a;
  }).join('').toLowerCase();
}

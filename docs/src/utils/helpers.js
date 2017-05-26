// @flow weak

export function kebabCase(string) {
  return string
    .split(/ |_|-/)
    .join('-')
    .split('')
    .map((a, i) => {
      if (a.toUpperCase() === a && a !== '-') {
        return (i !== 0 ? '-' : '') + a.toLowerCase();
      }
      return a;
    })
    .join('')
    .toLowerCase();
}

export function titleize(string) {
  return string
    .split('-')
    .map(word => word.split(''))
    .map(letters => {
      const first = letters.shift();
      return [first.toUpperCase(), ...letters].join('');
    })
    .join(' ');
}

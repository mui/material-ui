export default function texts(theme) {
  const texts = {};

  Object.keys(theme.typography).forEach((key) => {
    if (typeof theme.typography[key] === 'object') {
      texts[`.text-${key}`] = theme.typography[key];
    }
  });

  return texts;
}

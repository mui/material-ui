export default function literalToObject(literal: string | null | undefined) {
  if (!literal) {
    return {};
  }
  const lines = literal.split('\n');
  const result: Record<string, any> = {};
  const parent: Array<Record<string, any>> = [];
  let nested: Record<string, any> | null | undefined = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine.match(/}/)) {
      const [key, value] = trimmedLine.split(':');
      if (value && value.match(/{/)) {
        if (!nested) {
          result[key] = {};
          nested = result[key];
        } else {
          parent.push(nested);
          nested[key] = {};
          nested = nested[key];
        }
      } else if (key && !key.trim().match(/^(\/\/|\/\*)/) && value && nested) {
        try {
          const trimmedValue = value.trim().replace(/,$/, '');
          if (trimmedValue === 'undefined') {
            nested[key] = undefined;
          }
          if (trimmedValue === 'null') {
            nested[key] = null;
          }
          if (trimmedValue.match(/^('|")/)) {
            nested[key] = trimmedValue.slice(1, -1);
          }
        } catch (error) {
          // igore error
        }
      }
    } else {
      nested = parent.pop();
    }
  });

  return result;
}

const UNSAFE = /[{};]/;
// Emotion embeds keyframes interpolated into a value as `_EMO_<name>_<css>_EMO_` and extracts them
// while serializing, so that part holds real CSS and stays as is.
const KEYFRAMES = /(_EMO_[^_]+?_[\s\S]*?_EMO_)/;

function escapeChars(value: string) {
  return value.replace(/[{};]/g, (char) => `\\${char.charCodeAt(0).toString(16)} `);
}

function escapeValue(input: string) {
  // A trailing `;` is harmless in a value, so it's dropped rather than escaped into something that
  // invalidates the declaration.
  const value = input.replace(/;\s*$/, '');
  if (!UNSAFE.test(value)) {
    return value;
  }
  if (!value.includes('_EMO_')) {
    return escapeChars(value);
  }
  return value
    .split(KEYFRAMES)
    .map((part, index) => (index % 2 === 1 ? part : escapeChars(part)))
    .join('');
}

// Values in an array under a property key are fallbacks, which Emotion writes as `prop:value;`.
function escapeFallbacks(values: any[]) {
  let out: any[] | undefined;
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (typeof value === 'string' && UNSAFE.test(value)) {
      out ??= values.slice();
      out[i] = escapeValue(value);
    }
  }
  return out ?? values;
}

/**
 * Escapes the characters that end a declaration or open or close a block in every property value
 * of a style object, so a value can't add rules of its own. A string used as a whole style is raw
 * CSS and stays untouched. Returns the input when nothing needed escaping.
 */
export default function escapeStyleValues(style: any): any {
  if (style === null || typeof style !== 'object') {
    return style;
  }
  if (Array.isArray(style)) {
    let out: any[] | undefined;
    for (let i = 0; i < style.length; i += 1) {
      const next = escapeStyleValues(style[i]);
      if (next !== style[i]) {
        out ??= style.slice();
        out[i] = next;
      }
    }
    return out ?? style;
  }
  // Serialized styles and keyframes, which Emotion treats as raw CSS.
  if (style.styles !== undefined || style.anim === 1) {
    return style;
  }
  let out: any;
  // eslint-disable-next-line guard-for-in
  for (const key in style) {
    const value = style[key];
    let next = value;
    if (typeof value === 'string') {
      if (UNSAFE.test(value)) {
        next = escapeValue(value);
      }
    } else if (Array.isArray(value)) {
      next = typeof value[0] === 'string' ? escapeFallbacks(value) : escapeStyleValues(value);
    } else if (value !== null && typeof value === 'object') {
      next = escapeStyleValues(value);
    }
    if (next !== value) {
      out ??= { ...style };
      out[key] = next;
    }
  }
  return out ?? style;
}

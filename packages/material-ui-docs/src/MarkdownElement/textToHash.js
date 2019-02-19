export default function textToHash(text, unique = {}) {
  function makeUnique(hash, i = 0) {
    const uniqueHash = i ? `${hash}-${i}` : hash;
    if (!unique[uniqueHash]) {
      unique[uniqueHash] = true;
      return uniqueHash;
    }

    i += 1;
    return makeUnique(hash, i);
  }

  return makeUnique(
    encodeURI(
      text
        .toLowerCase()
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, '')
        // eslint-disable-next-line no-useless-escape
        .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/-$/g, ''),
    ),
  );
}

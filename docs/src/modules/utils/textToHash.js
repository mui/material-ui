function makeUnique(hash, unique, i = 1) {
  const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

  if (!unique[uniqueHash]) {
    unique[uniqueHash] = true;
    return uniqueHash;
  }

  return makeUnique(hash, unique, i + 1);
}

export default function textToHash(text, unique = {}) {
  return makeUnique(
    encodeURI(
      text
        .toLowerCase()
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, '')
        // eslint-disable-next-line no-useless-escape
        .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
    ),
    unique,
  );
}

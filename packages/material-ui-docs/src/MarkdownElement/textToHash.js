export default function textToHash(text) {
  return encodeURI(
    text
      .toLowerCase()
      .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, '')
      // eslint-disable-next-line no-useless-escape
      .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?]+/g, '')
      .replace(/[\s-]+/g, '-')
      .replace(/-$/g, ''),
  );
}

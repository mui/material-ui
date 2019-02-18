export default function textToHash(text) {
  return encodeURI(
    text
      .toLowerCase()
      .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>/g, '')
      // eslint-disable-next-line no-useless-escape
      .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?]+/g, '')
      .replace(/[\s-]+/g, '-')
      .replace(/-$/g, ''),
  );
}

export default function getUrlProduct(asPath: string) {
  const urlWithoutLang = asPath.replace(/^\/[a-zA-Z]{2}\//, '/');
  if (urlWithoutLang.startsWith('/x')) {
    return urlWithoutLang.replace('/x/react-', '').replace(/\/.*/, '');
  }
  return urlWithoutLang.replace(/^\/([^/]+)\/.*/, '$1');
}

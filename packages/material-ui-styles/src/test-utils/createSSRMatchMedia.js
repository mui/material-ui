import ssrMediaQueryList from './ssrMediaQueryList';

export default function createSSRMatchMedia(screen) {
  return function matchMedia(query) {
    return ssrMediaQueryList(query, screen);
  };
}

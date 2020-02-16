import useMediaQuery from './useMediaQuery';

// TODO v5: to deprecate in v4.x and remove in v5
export default function useMediaQueryTheme(...args) {
  return useMediaQuery(...args);
}

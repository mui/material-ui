import useMediaQuery from './useMediaQuery';

// TODO to deprecate in v4.x and remove in v5
function useMediaQueryTheme(...args) {
  return useMediaQuery(...args);
}

export default useMediaQueryTheme;

import makeStyles from '../makeStyles';
import multiKeyStore from '../makeStyles/multiKeyStore';
import useSynchronousEffect from '../makeStyles/useSynchronousEffect';
import useTheme from '../useTheme';
import noopTheme from '../getStylesCreator/noopTheme';
import warning from 'warning';

function pick(input, fields) {
  const output = {};

  Object.keys(input).forEach(prop => {
    if (fields.indexOf(prop) >= 0) {
      output[prop] = input[prop];
    }
  });

  return output;
}

export default function createCachedUseStyles({
  styleFunction,
  filterProps,
  makeStylesOptions: makeStylesOptionsProp,
  cacheStore,
}) {
  const makeStylesOptions = { ...makeStylesOptionsProp, muiDynamic: true };
  return props => {
    const theme = useTheme() || noopTheme;
    const propsForStyle = pick(props, filterProps);

    let hasFunc = false;
    const cacheKey = JSON.stringify(propsForStyle, (_key, value) => {
      if (typeof value !== 'function') return value;
      if (!hasFunc) {
        warning(false, 'Material-UI: You can not pass a function as style attribute.');
        hasFunc = true;
      }
      return 'invalid';
    });

    let cacheEntry = multiKeyStore.get(cacheStore, theme, cacheKey);
    if (!cacheEntry) {
      cacheEntry = {
        useStyles: makeStyles(
          { root: styleFunction({ theme, ...propsForStyle }) },
          makeStylesOptions,
        ),
        refs: 0,
      };
      if (!hasFunc) multiKeyStore.set(cacheStore, theme, cacheKey, cacheEntry);
    }

    useSynchronousEffect(() => {
      cacheEntry.refs += 1;
      return () => {
        cacheEntry.refs -= 1;
        if (cacheEntry.refs <= 0) {
          multiKeyStore.delete(cacheStore, theme, cacheKey);
        }
      };
    }, [cacheEntry, theme, cacheKey]);

    return cacheEntry.useStyles(props);
  };
}

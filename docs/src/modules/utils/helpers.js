import warning from 'warning';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export function titleize(string) {
  warning(
    typeof string === 'string' && string.length > 0,
    'titleize(string) expects a non empty string argument.',
  );

  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function pageToTitle(page) {
  if (page.title) {
    return page.title;
  }

  const name = page.pathname.replace(/.*\//, '');

  if (page.pathname.indexOf('/api/') !== -1) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
}

export function getDependencies(raw) {
  const deps = {
    '@material-ui/core': 'latest',
    'react-dom': 'latest',
    react: 'latest',
  };
  const re = /^import\s.*\sfrom\s+'([^']+)'/gm;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(raw))) {
    // handle scope names
    const name = m[1].charAt(0) === '@' ? m[1].split('/', 2).join('/') : m[1].split('/', 1)[0];
    deps[name] = deps[name] || 'latest';
  }
  return deps;
}

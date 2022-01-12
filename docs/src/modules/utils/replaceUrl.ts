import FEATURE_TOGGLE from 'docs/src/featureToggle';

function isNewLocation(url: string) {
  return (
    url.startsWith('/x') ||
    url.startsWith('/material') ||
    url.startsWith('/base') ||
    (FEATURE_TOGGLE.enable_system_scope && url.startsWith('/system'))
  );
}

export const replaceMaterialLinks = (url: string) => {
  if (isNewLocation(url)) {
    return url;
  }
  return url.replace(
    new RegExp(`(guides|customization|getting-started|discover-more)`),
    'material/$1',
  );
};

export const replaceComponentLinks = (url: string) => {
  if (isNewLocation(url)) {
    return url;
  }
  url = url.replace(/\/components\/data-grid/, '/x/react-data-grid');
  if (isNewLocation(url)) {
    return url;
  }
  url = url.replace(/\/components\/(.*)/, '/material/react-$1');
  return url;
};

export const replaceAPILinks = (url: string) => {
  if (isNewLocation(url) || !url.startsWith('/api')) {
    return url;
  }
  url = url
    .replace(/\/api\/data-grid(.*)/, '/x/api/data-grid$1')
    .replace(
      /\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)(.*)/,
      '/material/api/$1$2',
    )
    .replace(/\/api\/([^/]+-unstyled)(.*)/, '/base/api/$1$2');

  if (isNewLocation(url)) {
    return url;
  }
  return url.replace(/\/api\/(.*)/, '/material/api/$1');
};

export default function replaceUrl(url: string, asPath: string) {
  if (isNewLocation(asPath)) {
    url = replaceMaterialLinks(replaceAPILinks(replaceComponentLinks(url)));
    return url.replace(/^\/styles\/(.*)/, '/system/styles/$1');
  }
  return url;
}

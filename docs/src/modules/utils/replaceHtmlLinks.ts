import FEATURE_TOGGLE from 'docs/src/featureToggle';

export const replaceMaterialLinks = (markdown: string) => {
  return markdown.replace(
    /href=(\\*?)"\/(guides|customization|getting-started|discover-more)\/([^"]*)"/gm,
    'href=$1"/material/$2/$3"',
  );
};

export const replaceComponentLinks = (markdown: string) => {
  return markdown
    .replace(/href=(\\*?)"\/components\/data-grid([^"]*)"/gm, 'href=$1"/x/react-data-grid$2"')
    .replace(
      /href=(\\*?)"\/components\/((icons|material-icons|transitions|pickers|about-the-lab)\/?[^"]*)"/gm,
      'href=$1"/material/$2"',
    )
    .replace(
      /href=(\\*?)"\/components\/(?!tabs|breadcrumbs)([^"]*)"/gm,
      'href=$1"/material/react-$2"',
    )
    .replace(
      /href=(\\*?)"\/material\/(react-[-a-z]+)(x|ch)es(\/|#)([^"]*)"/gm,
      'href=$1"/material/$2$3$4$5"',
    )
    .replace(/href=(\\*?)"\/material\/(react-[-a-z]+)(x|ch)es"/gm, 'href=$1"/material/$2$3"')
    .replace(
      /href=(\\*?)"\/material\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s(\/|#)([^"]*)"/gm,
      'href=$1"/material/$2$3$4"',
    )
    .replace(
      /href=(\\*?)"\/material\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s"/gm,
      'href=$1"/material/$2"',
    )
    .replace(
      /href=(\\*?)"\/components\/(tabs|breadcrumbs)([^"]*)"/gm,
      'href=$1"/material/react-$2$3"',
    );
};

export const replaceAPILinks = (markdown: string) => {
  return markdown
    .replace(/href=(\\*?)"\/api\/data-grid([^"]*)"/gm, 'href=$1"/x/api/data-grid$2"')
    .replace(
      /href=(\\*?)"\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)([^"]*)"/gm,
      'href=$1"/material/api/$2$3"',
    )
    .replace(/href=(\\*?)"\/api\/([^"-]+-unstyled)([^"]*)"/gm, 'href=$1"/base/api/$2$3"')
    .replace(/href=(\\*?)"\/api\/([^"]*)"/gm, 'href=$1"/material/api/$2"');
};

const replaceStylesLinks = (markdown: string) => {
  return markdown.replace(/href=(\\*?)"\/styles\/([^"]*)"/gm, 'href=$1"/system/styles/$2"');
};

export default function replaceHtmlLinks(markdown: string, asPath: string) {
  if (
    asPath.startsWith('/material/') ||
    asPath.startsWith('/x/') ||
    asPath.startsWith('/base/') ||
    (FEATURE_TOGGLE.enable_system_scope && asPath.startsWith('/system'))
  ) {
    return replaceStylesLinks(
      replaceMaterialLinks(replaceAPILinks(replaceComponentLinks(markdown))),
    );
  }
  return markdown;
}

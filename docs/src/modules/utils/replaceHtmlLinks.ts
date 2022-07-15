export const replaceMaterialLinks = (html: string) => {
  return html.replace(
    /href=(\\*?)"(\/[a-z]{2})?\/(guides|customization|getting-started|discover-more)\/([^"]*)"/gm,
    'href=$1"$2/material-ui/$3/$4"',
  );
};

export const replaceComponentLinks = (html: string) => {
  return html
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/components\/data-grid([^"]*)"/gm,
      'href=$1"$2/x/react-data-grid$3"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/components\/((icons|material-icons|transitions|pickers|about-the-lab)\/?[^"]*)"/gm,
      'href=$1"$2/material-ui/$3"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/components\/(?!tabs|breadcrumbs)([^"]*)"/gm,
      'href=$1"$2/material-ui/react-$3"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/material-ui\/(react-[-a-z]+)(x|ch)es(\/|#)([^"]*)"/gm,
      'href=$1"$2/material-ui/$3$4$5$6"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/material-ui\/(react-[-a-z]+)(x|ch)es"/gm,
      'href=$1"$2/material-ui/$3$4"',
    )
    .replace(/react-trap-focu/gm, 'react-trap-focus')
    .replace(/react-progres/gm, 'react-progress')
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/material-ui\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s(\/|#)([^"]*)"/gm,
      'href=$1"$2/material-ui/$3$4$5"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/material-ui\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s"/gm,
      'href=$1"$2/material-ui/$3"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/components\/(tabs|breadcrumbs)([^"]*)"/gm,
      'href=$1"$2/material-ui/react-$3$4"',
    );
};

export const replaceAPILinks = (html: string) => {
  return html
    .replace(/href=(\\*?)"(\/[a-z]{2})?\/api\/data-grid([^"]*)"/gm, 'href=$1"$2/x/api/data-grid$3"')
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/api\/([^"/]+-unstyled)([^"]*)"/gm,
      'href=$1"$2/base/api/$3$4"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/api\/(unstable-trap-focus|click-away-listener|no-ssr|portal|textarea-autosize)([^"]*)"/gm,
      'href=$1"$2/base/api/$3$4"',
    )
    .replace(
      /href=(\\*?)"(\/[a-z]{2})?\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)([^"]*)"/gm,
      'href=$1"$2/material-ui/api/$3$4"',
    )
    .replace(/href=(\\*?)"(\/[a-z]{2})?\/api\/([^"]*)"/gm, 'href=$1"$2/material-ui/api/$3"');
};

const replaceStylesLinks = (html: string) => {
  return html.replace(
    /href=(\\*?)"(\/[a-z]{2})?\/styles\/([^"]*)"/gm,
    'href=$1"$2/system/styles/$3"',
  );
};

export default function replaceHtmlLinks(html: string, asPath: string) {
  asPath = asPath.replace(/^\/[a-z]{2}\//, '/');
  if (
    asPath.startsWith('/material-ui/') ||
    asPath.startsWith('/joy-ui/') ||
    asPath.startsWith('/x/') ||
    asPath.startsWith('/base/') ||
    asPath.startsWith('/system')
  ) {
    return replaceStylesLinks(replaceMaterialLinks(replaceAPILinks(replaceComponentLinks(html))));
  }
  return html;
}

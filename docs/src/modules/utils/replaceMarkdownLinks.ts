export const replaceMaterialLinks = (markdown: string) => {
  return markdown.replace(
    /\(\/(guides|customization|getting-started|discover-more)\/([^)]*)\)/gm,
    '(/material-ui/$1/$2)',
  );
};

export const replaceComponentLinks = (markdown: string) => {
  return markdown
    .replace(/\(\/components\/data-grid([^)]*)\)/gm, '(/x/react-data-grid$1)')
    .replace(
      /\(\/components\/((icons|material-icons|transitions|pickers|about-the-lab)\/?[^)]*)\)/gm,
      '(/material-ui/$1)',
    )
    .replace(/\(\/components\/(?!tabs|breadcrumbs)([^)]*)\)/gm, '(/material-ui/react-$1)')
    .replace(/\(\/material-ui\/(react-[-a-z]+)(x|ch)es(\/|#)([^)]*)\)/gm, '(/material-ui/$1$2$3$4)')
    .replace(/\(\/material-ui\/(react-[-a-z]+)(x|ch)es"/gm, '(/material-ui/$1$2)')
    .replace(
      /\(\/material-ui\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s(\/|#)([^)]*)\)/gm,
      '(/material-ui/$1$2$3)',
    )
    .replace(
      /\(\/material-ui\/(?!react-tabs|react-breadcrumbs)(react-[-a-z]+)s"/gm,
      '(/material-ui/$1)',
    )
    .replace(/react-trap-focu/gm, 'react-trap-focus')
    .replace(/react-trap-focuss/gm, 'react-trap-focus')
    .replace(/react-progres/gm, 'react-progress')
    .replace(/react-progresss/gm, 'react-progress')
    .replace(/\(\/components\/(tabs|breadcrumbs)([^)]*)\)/gm, '(/material-ui/react-$1$2)');
};

export const replaceAPILinks = (markdown: string) => {
  return markdown
    .replace(/\(\/api\/data-grid([^)]*)\)/gm, '(/x/api/data-grid$1)')
    .replace(/\(\/api\/([^"/]+)(-unstyled)([^)]*)\)/gm, '(/base-ui/api/$1$3)')
    .replace(
      /\(\/api\/(focus-trap|click-away-listener|no-ssr|portal|textarea-autosize)([^)]*)\)/gm,
      '(/base-ui/api/$1$2)',
    )
    .replace(
      /\(\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)([^)]*)\)/gm,
      '(/material-ui/api/$1$2)',
    )
    .replace(/\(\/api\/([^)]*)\)/gm, '(/material-ui/api/$1)');
};

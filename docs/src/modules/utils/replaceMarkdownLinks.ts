export const replaceMaterialLinks = (markdown: string) => {
  return markdown.replace(
    /href=(\\*?)"\/(guides|customization|getting-started|discover-more)\/([^"]*)"/gm,
    'href=$1"/material/$2/$3"',
  );
};

export const replaceComponentLinks = (markdown: string) => {
  return markdown
    .replace(/href=(\\*?)"\/components\/data-grid([^"]*)"/gm, 'href=$1"/x/react-data-grid$2"')
    .replace(/href=(\\*?)"\/components\/([^"]+)"/gm, 'href=$1"/material/react-$2"');
};

export const replaceAPILinks = (markdown: string) => {
  return markdown
    .replace(/href=(\\*?)"\/api\/data-grid([^"]*)"/gm, 'href=$1"/x/api/mui-data-grid$2"')
    .replace(
      /href=(\\*?)"\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)([^"]*)"/gm,
      'href=$1"/material/api/mui-lab/$2$3"',
    )
    .replace(/href=(\\*?)"\/api\/([^"-]+-unstyled)([^"]*)"/gm, 'href=$1"/base/api/mui-base/$2$3"')
    .replace(/href=(\\*?)"\/api\/([^"]*)"/gm, 'href=$1"/material/api/mui-material/$2"');
};

export default function replaceMarkdownLinks(markdown: string, asPath: string) {
  if (asPath.startsWith('/material/') || asPath.startsWith('/x/') || asPath.startsWith('/base/')) {
    return replaceMaterialLinks(replaceAPILinks(replaceComponentLinks(markdown)));
  }
  return markdown;
}

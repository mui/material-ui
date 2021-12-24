export const replaceComponentLinks = (markdown: string) => {
  return markdown
    .replace(/href="\/components\/data-grid([^"]*)"/gm, 'href="/x/react-data-grid$1"')
    .replace(/href="\/components\/([^"]+)"/gm, 'href="/material/react-$1"');
};

export const replaceAPILinks = (markdown: string) => {
  return markdown
    .replace(/href="\/api\/data-grid([^"]*)"/gm, 'href="/x/api/mui-data-grid$1"')
    .replace(
      /href="\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)([^"]*)"/gm,
      'href="/material/api/mui-lab/$1$2"',
    )
    .replace(/href="\/api\/([^"-]+-unstyled)([^"]*)"/gm, 'href="/material/api/mui-base/$1$2"')
    .replace(/href="\/api\/([^"]*)"/gm, 'href="/material/api/mui-material/$1"');
};

export default function replaceMarkdownLinks(markdown: string, asPath: string) {
  if (asPath.startsWith('/material/') || asPath.startsWith('/x/')) {
    return replaceAPILinks(replaceComponentLinks(markdown));
  }
  return markdown;
}

import { MuiPage } from 'docs/src/pages';

export default function findActivePage(
  currentPages: MuiPage[],
  pathname: string,
): { activePage: MuiPage | null; activePageParents: MuiPage[] } {
  const map: Record<string, MuiPage> = {};
  const mapParent: Record<string, MuiPage> = {};

  const traverse = (parent: MuiPage) => {
    (parent.children || []).forEach((child) => {
      map[child.pathname] = child;
      mapParent[child.pathname] = parent;
      if (
        child.pathname.endsWith('/demos') ||
        child.pathname.endsWith('component-api') ||
        child.pathname.endsWith('hook-api')
      ) {
        const childPathname = child.pathname
          .replace('/demos', '/[docsTab]')
          .replace('/component-api', '/[docsTab]')
          .replace('/hook-api', '/[docsTab]');
        map[childPathname] = child;
        mapParent[childPathname] = parent;
      }

      traverse(child);
    });
  };

  traverse({ pathname: '/', children: currentPages });

  const activePage = map[pathname] || null;
  const activePageParents = [];
  let traversePage = activePage;
  while (traversePage && traversePage.pathname !== '/') {
    const parent = mapParent[traversePage.pathname];
    activePageParents.push(parent);
    traversePage = parent;
  }

  return {
    activePage,
    activePageParents,
  };
}

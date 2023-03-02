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
      if (!child.query && mapParent[child.pathname]) {
        throw new Error(`Duplicated pathname ${child.pathname} in pages`);
      }

      if (!child.query) {
        mapParent[child.pathname] = parent;
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

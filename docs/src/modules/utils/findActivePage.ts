import { MuiPage } from 'docs/src/pages';

const getKey = (pathname: string, query?: object) => {
  return `${pathname}${query && Object.keys(query).length > 0 ? JSON.stringify(query) : ''}`;
};
export default function findActivePage(
  currentPages: MuiPage[],
  pathname: string,
  query?: object,
): { activePage: MuiPage | null; activePageParents: MuiPage[] } {
  const map: Record<string, MuiPage> = {};
  const mapParent: Record<string, MuiPage> = {};
  const cleanedQuery = { ...query };
  // @ts-ignore
  if (cleanedQuery.userLanguage) {
    // @ts-ignore
    delete cleanedQuery['userLanguage'];
  }
  const traverse = (parent: MuiPage) => {
    (parent.children || []).forEach((child) => {
      const key = getKey(child.pathname, child.query);

      map[key] = child;
      if (mapParent[key]) {
        throw new Error(`Duplicated pathname ${child.pathname} in pages`);
      }

      mapParent[key] = parent;
      traverse(child);
    });
  };

  traverse({ pathname: '/', children: currentPages });

  const activePage = map[getKey(pathname, cleanedQuery)] || null;

  const activePageParents = [];
  let traversePage = activePage;
  while (traversePage && traversePage.pathname !== '/') {
    const parent = mapParent[getKey(traversePage.pathname, traversePage.query)];
    activePageParents.push(parent);
    traversePage = parent;
  }
  return {
    activePage,
    activePageParents,
  };
}

import { MuiPage } from 'docs/src/pages';

const getKey = (pathname: string, query?: object, hash?: string) => {
  return `${pathname}${query && Object.keys(query).length > 0 ? JSON.stringify(query) : ''}${
    (query as any)?.docsTab ? hash ?? '' : ''
  }`;
};
export default function findActivePage(
  currentPages: MuiPage[],
  pathname: string,
  query?: object,
  hash?: string,
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
      const key = getKey(child.pathname, child.query, child.hash);
      map[key] = child;
      if (mapParent[key]) {
        throw new Error(`Duplicated pathname ${child.pathname} in pages`);
      }

      mapParent[key] = parent;
      traverse(child);
    });
  };

  traverse({ pathname: '/', children: currentPages });

  const activePage = map[getKey(pathname, cleanedQuery, hash)] || null;

  const activePageParents = [];
  let traversePage = activePage;
  while (traversePage && traversePage.pathname !== '/') {
    const parent = mapParent[getKey(traversePage.pathname, traversePage.query, traversePage.hash)];
    activePageParents.push(parent);
    traversePage = parent;
  }
  return {
    activePage,
    activePageParents,
  };
}

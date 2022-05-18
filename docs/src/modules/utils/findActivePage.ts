import { MuiPage } from 'docs/src/pages';

export default function findActivePage(currentPages: MuiPage[], pathname: string): MuiPage | null {
  const map: Record<string, MuiPage> = {};

  const traverse = (array: MuiPage[]) => {
    array.forEach((item) => {
      map[item.pathname] = item;
      traverse(item.children || []);
    });
  };

  traverse(currentPages);

  return map[pathname] || null;
}

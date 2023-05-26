import { useRouter } from 'next/router';

export default function useRouterExtra() {
  const router = useRouter();

  const asPathWithoutLang = router.asPath.replace(/^\/+[a-zA-Z]{2}\//, '/');
  const firstFolder = asPathWithoutLang.replace(/^\/+([^/]+)\/.*/, '$1');
  let product = firstFolder;
  if (asPathWithoutLang.startsWith('/x/')) {
    product = asPathWithoutLang.replace('/x/react-', '').replace(/\/.*/, '');
  }

  if (asPathWithoutLang === '/versions/') {
    product = 'core';
  }

  return {
    ...router,
    asPathWithoutLang,
    product: product as
      | 'core'
      | 'base-ui'
      | 'material-ui'
      | 'joy-ui'
      | 'system'
      | 'data-grid'
      | 'date-pickers',
  };
}

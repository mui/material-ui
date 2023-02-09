import { useRouter } from 'next/router';

export default function useRouterExtra() {
  const router = useRouter();

  console.log('router.asPath', router.asPath);
  const asPathWithoutLang = router.asPath.replace(/^\/+[a-zA-Z]{2}\//, '/');
  console.log('asPathWithoutLang', asPathWithoutLang);
  let product = asPathWithoutLang.replace(/^\/+([^/]+)\/.*/, '$1');
  if (asPathWithoutLang.startsWith('/x')) {
    product = asPathWithoutLang.replace('/x/react-', '').replace(/\/.*/, '');
  }
  console.log('product', product);
  return {
    ...router,
    asPathWithoutLang,
    product: product as 'base' | 'material-ui' | 'joy-ui' | 'system' | 'data-grid' | 'date-pickers',
    isMuiX: asPathWithoutLang.startsWith('/x'),
  };
}

import createMetadata, { GenerateMetadataProps } from 'docs/src/modules/utils/createMetadata';
import { Metadata } from 'next';
import Custom404 from './Custom404';

export const dynamic = 'force-dynamic'; // TODO

export function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
  return createMetadata(props, {
    description: '',
    title: '404: This page could not be found - MUI',
  });
}

export default function NotFound() {
  return <Custom404 />;
}

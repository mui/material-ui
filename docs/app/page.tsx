import createMetadata, { GenerateMetadataProps } from 'docs/src/modules/utils/createMetadata';
import { Metadata } from 'next';
import Home from './home';

export function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
  return createMetadata(props, {
    card: '/static/social-previews/home-preview.jpg',
    description:
      'MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design.',
    title: 'MUI: The React component library you always wanted',
  });
}

export default function Page() {
  return <Home />;
}

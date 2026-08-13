import NextDocument from 'next/document';
import {
  Document as MuiDocsDocument,
  createGetInitialProps,
  type DocumentProps,
} from '@mui/internal-core-docs/Document';

export default class MuiDocument extends NextDocument {
  static getInitialProps = createGetInitialProps({ setupStyledComponents: true });

  render() {
    return <MuiDocsDocument {...(this.props as unknown as DocumentProps)} />;
  }
}

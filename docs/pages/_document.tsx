import NextDocument from 'next/document';
import {
  Document as MuiDocsDocument,
  createGetInitialProps,
  type DocumentProps,
} from '@mui/internal-core-docs/Document';
import styledComponentsEngine from 'docs/src/modules/styledComponents';

export default class MuiDocument extends NextDocument {
  static getInitialProps = createGetInitialProps({ styleEngine: styledComponentsEngine });

  render() {
    return <MuiDocsDocument {...(this.props as unknown as DocumentProps)} />;
  }
}

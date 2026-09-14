import NextDocument from 'next/document';
import {
  Document as MuiDocsDocument,
  createGetInitialProps,
  type DocumentProps,
} from '@mui/internal-core-docs/Document';
import documentStyleEngine from 'docs/src/modules/styledComponents/documentStyleEngine';

export default class MuiDocument extends NextDocument {
  static getInitialProps = createGetInitialProps({ styleEngines: [documentStyleEngine] });

  render() {
    return <MuiDocsDocument {...(this.props as unknown as DocumentProps)} />;
  }
}

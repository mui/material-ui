import NextDocument from 'next/document';
import { Document as MuiDocsDocument, createGetInitialProps } from '@mui/docs/Document';
import JoyInitColorSchemeScript from '@mui/joy/InitColorSchemeScript';

export default class MuiDocument extends NextDocument {
  static getInitialProps = createGetInitialProps({ setupStyledComponents: true });

  render() {
    return (
      <MuiDocsDocument {...this.props}>
        <JoyInitColorSchemeScript defaultMode="system" />
      </MuiDocsDocument>
    );
  }
}

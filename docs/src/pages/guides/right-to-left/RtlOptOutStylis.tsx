import * as React from 'react';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

const Root = styled('div')((props: { theme?: Theme }) => ({
  width: '100%',
  marginTop: props.theme?.spacing(4),
  marginRight: props.theme?.spacing(2),
}));

const AffectedText = styled('div')`
  text-align: left;
`;

const UnaffectedText = styled('div')`
  /* @noflip */
  text-align: left;
`;

const theme = createMuiTheme();

export default function RtlOptOut() {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <AffectedText>Affected</AffectedText>
        <UnaffectedText>Unaffected</UnaffectedText>
      </Root>
    </ThemeProvider>
  );
}

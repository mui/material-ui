// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { withTheme } from 'material-ui/styles';

const style = {
  maxWidth: '100%',
  maxHeight: 400,
  overflow: 'auto',
};

function ThemeDefault(props) {
  const { theme: { id, ...theme } } = props;

  const text = `
\`\`\`js
${JSON.stringify(theme, null, 2)}
\`\`\`
  `;

  return <MarkdownElement style={style} text={text} />;
}

ThemeDefault.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ThemeDefault);

import * as React from 'react';
import PropTypes from 'prop-types';
import prism from '@material-ui/markdown/prism';
import MarkdownElement from './MarkdownElement';

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const { code, language, component: Component = MarkdownElement, ...other } = props;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);

  return (
    <Component ref={ref} {...other}>
      <pre>
        <code
          className={`language-${language}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: renderedCode }}
        />
      </pre>
    </Component>
  );
});

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  language: PropTypes.string.isRequired,
};

export default HighlightedCode;

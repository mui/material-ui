import * as React from 'react';
import * as PropTypes from 'prop-types';
import MarkdownElement from './MarkdownElement';
import prism from 'docs/src/modules/utils/prism';

export default function HighlightedCode(props) {
  const { code, language } = props;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);

  return (
    <MarkdownElement>
      <pre>
        <code
          className={`language-${language}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: renderedCode }}
        />
      </pre>
    </MarkdownElement>
  );
}

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

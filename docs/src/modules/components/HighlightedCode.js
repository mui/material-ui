import * as React from 'react';
import PropTypes from 'prop-types';
import prism from '@mui/markdown/prism';
import NoSsr from '@mui/base/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import CodeCopyButton from 'docs/src/modules/components/CodeCopyButton';
import { useCodeCopy } from 'docs/src/modules/utils/CodeCopy';

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const {
    copyButtonHidden = false,
    copyButtonProps,
    code,
    language,
    component: Component = MarkdownElement,
    ...other
  } = props;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);
  const handlers = useCodeCopy();

  return (
    <Component ref={ref} {...other}>
      <div className="MuiCode-root" {...handlers}>
        <pre>
          <code
            className={`language-${language}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: renderedCode }}
          />
        </pre>
        {copyButtonHidden ? null : (
          <NoSsr>
            <CodeCopyButton code={code} {...copyButtonProps} />
          </NoSsr>
        )}
      </div>
    </Component>
  );
});

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  copyButtonHidden: PropTypes.bool,
  copyButtonProps: PropTypes.object,
  language: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default HighlightedCode;

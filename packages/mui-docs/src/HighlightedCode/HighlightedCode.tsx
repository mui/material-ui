import * as React from 'react';
import prism from '@mui/internal-markdown/prism';
import { NoSsr } from '@mui/base/NoSsr';
import { ButtonProps } from '@mui/material/Button';
import { SxProps } from '@mui/material/styles';
import { useCodeCopy, CodeCopyButton } from '../CodeCopy';
import { MarkdownElement } from '../MarkdownElement';

export interface HighlightedCodeProps {
  code: string;
  component?: React.ElementType;
  copyButtonHidden?: boolean;
  copyButtonProps?: ButtonProps;
  language: string;
  sx?: SxProps;
}

export const HighlightedCode = React.forwardRef<HTMLDivElement, HighlightedCodeProps>(
  function HighlightedCode(props, ref) {
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
          {copyButtonHidden ? null : (
            <NoSsr>
              <CodeCopyButton code={code} {...copyButtonProps} />
            </NoSsr>
          )}
          <pre>
            <code
              className={`language-${language}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: renderedCode }}
            />
          </pre>
        </div>
      </Component>
    );
  },
);

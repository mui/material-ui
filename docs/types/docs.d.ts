declare module 'docs/src/modules/components/MarkdownElement' {
  import React from 'react';
  import { StyledComponentProps } from '@material-ui/core/styles';

  type ClassKey = 'root';
  export interface Props extends StyledComponentProps<ClassKey> {
    className?: string;
    /**
     * text in markdown
     */
    text: string;
  }
  export default function MarkdownElement(props: Props): React.ReactElement;
}

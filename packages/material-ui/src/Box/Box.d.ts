import * as React from 'react';

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    Pick<
      React.CSSProperties,
      | 'alignContent'
      | 'alignItems'
      | 'alignSelf'
      | 'border'
      | 'borderBottom'
      | 'borderColor'
      | 'borderLeft'
      | 'borderRadius'
      | 'borderRight'
      | 'borderTop'
      | 'bottom'
      | 'boxShadow'
      | 'color'
      | 'cursor'
      | 'display'
      | 'flex'
      | 'flexDirection'
      | 'flexGrow'
      | 'flexShrink'
      | 'flexWrap'
      | 'fontFamily'
      | 'fontSize'
      | 'fontWeight'
      | 'height'
      | 'justifyContent'
      | 'left'
      | 'maxHeight'
      | 'maxWidth'
      | 'minHeight'
      | 'minWidth'
      | 'overflowX'
      | 'overflowY'
      | 'position'
      | 'right'
      | 'textAlign'
      | 'top'
      | 'width'
      | 'zIndex'
    > {
  component?: React.ElementType;
  // styled API
  clone?: boolean;
  // Box specific props
  bgcolor?: string;
  displayPrint?: string;
  m?: string | number;
  mb?: string | number;
  ml?: string | number;
  mr?: string | number;
  mt?: string | number;
  mx?: string | number;
  my?: string | number;
  order?: string | number;
  p?: string | number;
  pb?: string | number;
  pl?: string | number;
  pr?: string | number;
  pt?: string | number;
  px?: string | number;
  py?: string | number;
}

declare const Box: React.ComponentType<BoxProps>;

export default Box;

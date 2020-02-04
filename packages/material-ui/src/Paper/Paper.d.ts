import * as React from 'react';
import { StandardProps } from '..';

export interface PaperProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PaperClassKey> {
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  elevation?: number;
  square?: boolean;
  variant?: 'elevation' | 'outlined';
}

export type PaperClassKey =
  | 'root'
  | 'rounded'
  | 'outlined'
  | 'elevation0'
  | 'elevation1'
  | 'elevation2'
  | 'elevation3'
  | 'elevation4'
  | 'elevation5'
  | 'elevation6'
  | 'elevation7'
  | 'elevation8'
  | 'elevation9'
  | 'elevation10'
  | 'elevation11'
  | 'elevation12'
  | 'elevation13'
  | 'elevation14'
  | 'elevation15'
  | 'elevation16'
  | 'elevation17'
  | 'elevation18'
  | 'elevation19'
  | 'elevation20'
  | 'elevation21'
  | 'elevation22'
  | 'elevation23'
  | 'elevation24';

declare const Paper: React.ComponentType<PaperProps>;

export default Paper;

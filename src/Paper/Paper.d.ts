import * as React from 'react';
import { StandardProps } from '..';

export interface PaperProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PaperClassKey> {
  component?: React.ReactType<PaperProps>;
  elevation?: number;
  square?: boolean;
}

export type PaperClassKey =
  | 'root'
  | 'rounded'
  | 'shadow0'
  | 'shadow1'
  | 'shadow2'
  | 'shadow3'
  | 'shadow4'
  | 'shadow5'
  | 'shadow6'
  | 'shadow7'
  | 'shadow8'
  | 'shadow9'
  | 'shadow10'
  | 'shadow11'
  | 'shadow12'
  | 'shadow13'
  | 'shadow14'
  | 'shadow15'
  | 'shadow16'
  | 'shadow17'
  | 'shadow18'
  | 'shadow19'
  | 'shadow20'
  | 'shadow21'
  | 'shadow22'
  | 'shadow23'
  | 'shadow24';

declare const Paper: React.ComponentType<PaperProps>;

export default Paper;

// eslint-disable-next-line no-restricted-imports -- importing types
import { InternalStandardProps as StandardProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { TimelineClasses } from './timelineClasses';

export interface TimelineProps extends StandardProps<React.HTMLAttributes<HTMLUListElement>> {
  /**
   * The position where the TimelineContent should appear relative to the time axis.
   * @default 'right'
   */
  position?: 'left' | 'right' | 'alternate' | 'alternate-reverse';
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineClasses>;
  /**
   * className applied to the root element.
   */
  className?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

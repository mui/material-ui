declare module '@date-io/type' {
  import { Moment } from 'moment';
  import { DateTime } from 'luxon';

  export type DateType = Moment | DateTime | Date;
}

declare module '@material-ui/core/internal/svg-icons/createSvgIcon' {
  import * as React from 'react';
  import { SvgIconProps } from '@material-ui/core';

  declare const createSvgIcon: (path: React.ReactNode, name: string) => React.FC<SvgIconProps>;
  export default createSvgIcon;
}

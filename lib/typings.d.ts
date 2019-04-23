declare module '@date-io/type' {
  import { Moment } from 'moment';
  import { DateTime } from 'luxon';

  export type DateType = Moment | DateTime | Date;
}

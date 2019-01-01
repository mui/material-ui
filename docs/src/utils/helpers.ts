import moment, { Moment } from 'moment';
import { DateTime } from 'luxon';

export default function cloneCrossUtils(date: Date | Moment | DateTime) {
  if (date instanceof moment) {
    return (date as Moment).clone().toDate();
  }

  if (date instanceof DateTime) {
    return date.toJSDate();
  }

  if (date instanceof Date) {
    return new Date(date.getTime());
  }

  throw new Error('Cannot properly parse argument passed to cloneCrossUtils');
}

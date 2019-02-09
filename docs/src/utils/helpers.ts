import moment, { Moment } from 'moment';
import { DateTime } from 'luxon';
import dayjs, { Dayjs } from 'dayjs';

export default function cloneCrossUtils(date: Date | Moment | DateTime | Dayjs) {
  if (date instanceof dayjs) {
    return (date as Dayjs).clone().toDate();
  }

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

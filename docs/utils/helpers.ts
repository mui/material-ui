import dayjs, { Dayjs } from 'dayjs';
import moment, { Moment } from 'moment';
import { DateTime } from 'luxon';

export function stringToTestId(string: string) {
  return string.replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '');
}

export function makeJSDateObject(date: Date | Moment | DateTime | Dayjs) {
  if (date instanceof dayjs) {
    return (date as Dayjs).clone().toDate();
  }

  if (moment.isMoment(date)) {
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

export function copy(text: string) {
  return navigator.clipboard.writeText(text);
}

export function loadScript(src: string, position: Element) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  position.appendChild(script);

  return script;
}

export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export declare function formatNumber(num: string): string;
export declare function getCalendarHeaderText(date: any): string;
export declare function getDatePickerHeaderText(date: any): string;
export declare function getDateTimePickerHeaderText(date: any): string;
export declare function getDayText(date: any): string;
export declare function getHourText(date: any): string;
export declare function getMinuteText(date: any): string;
export declare function getMeridiemText(ampm: 'am' | 'pm'): string;
export declare function getYearText(date: any): string;
export declare function getMonthNumber(date: any): number;
export declare function getStartOfMonth(date: any): any;
export declare function getNextMonth(date: any): any;
export declare function getPreviousMonth(date: any): any;
export declare function getYear(date: any): any;
export declare function setYear(date: any, year: number): any;
export declare function getWeekdays(): string[];
export declare function getWeekArray(date: any): any[][];

export interface Utils {
  formatNumber: typeof formatNumber;
  getCalendarHeaderText: typeof getCalendarHeaderText;
  getDatePickerHeaderText: typeof getDatePickerHeaderText;
  getDateTimePickerHeaderText: typeof getDateTimePickerHeaderText;
  getDayText: typeof getDayText;
  getHourText: typeof getHourText;
  getMinuteText: typeof getMinuteText;
  getMeridiemText: typeof getMeridiemText;
  getYearText: typeof getYearText;
  getMonthNumber: typeof getMonthNumber;
  getStartOfMonth: typeof getStartOfMonth;
  getNextMonth: typeof getNextMonth;
  getPreviousMonth: typeof getPreviousMonth;
  getYear: typeof getYear;
  setYear: typeof setYear;
  getWeekdays: typeof getWeekdays;
  getWeekArray: typeof getWeekArray;
}

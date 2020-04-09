import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';

export type RangeInput = [ParsableDate, ParsableDate];
export type DateRange = [MaterialUiPickersDate, MaterialUiPickersDate];

export interface CurrentlySelectingRangeEndProps {
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}

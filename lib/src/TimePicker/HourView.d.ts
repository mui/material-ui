import { ComponentClass } from 'react';
import { Utils } from '../typings/utils';
import { MaterialUiPickersDate } from '../typings/date'

export interface HourViewProps {
    date: MaterialUiPickersDate;
    onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
    ampm?: boolean;
    utils?: Utils<MaterialUiPickersDate>;
}

declare const HourView: ComponentClass<HourViewProps>;

export default HourView;

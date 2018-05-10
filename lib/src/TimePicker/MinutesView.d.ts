import { ComponentClass } from 'react';
import { Utils } from '../typings/utils';
import { MaterialUiPickersDate } from '../typings/date'

export interface MinutesViewProps {
    date: MaterialUiPickersDate;
    onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
    utils?: Utils<MaterialUiPickersDate>;
}

declare const MinutesView: ComponentClass<MinutesViewProps>;

export default MinutesView;

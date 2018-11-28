import { ClassNameMap, StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { styles as DTHeaderStyles } from '../DateTimePicker/components/DateTimePickerHeader';
import { styles as DTTabsStyles } from '../DateTimePicker/components/DateTimePickerTabs';

type Classes<T> = ClassNameMap<
  T extends string
    ? T
    : T extends StyleRulesCallback<infer K> ? K : T extends StyleRules<infer D> ? D : never
>;

export interface MuiPickersOverrides {
  MuiPickerDTHeader: Classes<typeof DTHeaderStyles>;
  MuiPickerDTTabs: Classes<typeof DTTabsStyles>;
}

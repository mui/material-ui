import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';

const Icon: React.FunctionComponent<SvgIconProps> = (props) => <ArrowDownwardIcon {...props} />;

function TestTableSortLabel() {
  return <TableSortLabel active direction="desc" IconComponent={Icon} />;
}

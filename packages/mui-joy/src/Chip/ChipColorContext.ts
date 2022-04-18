import * as React from 'react';
import { ChipProps } from './ChipProps';

const ChipColorContext = React.createContext<ChipProps['color']>(undefined);

export default ChipColorContext;

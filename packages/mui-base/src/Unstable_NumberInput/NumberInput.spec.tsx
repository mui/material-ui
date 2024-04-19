import * as React from 'react';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

/* @ts-expect-error - inputId shouldn't be available on NumberInput */
<NumberInput inputId="" />;

/* @ts-expect-error - inputRef shouldn't be available on NumberInput */
<NumberInput inputRef={{}} />;

import getReactElementRef from '@mui/utils/getReactElementRef';
import * as React from 'react';

// @ts-expect-error
getReactElementRef(false);

// @ts-expect-error
getReactElementRef(null);

// @ts-expect-error
getReactElementRef(undefined);

// @ts-expect-error
getReactElementRef(1);

// @ts-expect-error
getReactElementRef([<div key="1" />, <div key="2" />]);

getReactElementRef(<div />);

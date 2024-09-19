import getReactNodeRef from '@mui/utils/getReactElementRef';
import * as React from 'react';

// @ts-expect-error
getReactNodeRef(false);

// @ts-expect-error
getReactNodeRef(null);

// @ts-expect-error
getReactNodeRef(undefined);

// @ts-expect-error
getReactNodeRef(1);

// @ts-expect-error
getReactNodeRef([<div key="1" />, <div key="2" />]);

getReactNodeRef(<div />);

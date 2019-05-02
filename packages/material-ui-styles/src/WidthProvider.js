import React from 'react';
import WidthContext from './WidthContext';
import PropTypes from 'prop-types';
import useWidth from './useWidth';
import useTheme from './useTheme';
import { exactProp } from '@material-ui/utils';

export default function WidthProvider(props) {
    const { children, theme } = props;
    const theme2 = useTheme(); // cannot use hooks conditionally
    const width = useWidth(theme || theme2);
    return React.createElement(WidthContext.Provider, { value: width }, children);
}

WidthProvider.propTypes = {
    /**
     * You can wrap a node.
    */
    children: PropTypes.node.isRequired,
    /**
     * A theme object.
     */
    theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

if (process.env.NODE_ENV !== 'production') {
    WidthProvider.propTypes = exactProp(WidthProvider.propTypes);
}

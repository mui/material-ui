import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import useTheme from './useTheme';
import useWidth from './useWidth';
import ThemeProvider from './ThemeProvider';

function createSSRMatchMedia() {

    return {
        ssrMatchMedia(query) {

            // returns eventTarget
        },
        changeScreenWidth(width) {

        }
    };
}

describe('useWidth', () => {
    let mount;

    before(() => {
        mount = createMount();
    });

    after(() => {
        mount.cleanUp();
    });

    it('should use the theme', () => {
        function Test() {
            const theme = useTheme();
            const size = useWidth(theme);

            return <span>{size}</span>;
        }

        const wrapper = mount(
            <ThemeProvider theme={{ foo: 'foo' }}>
                <Test />
            </ThemeProvider>,
        );
        assert.strictEqual(wrapper.text(), 'foo');
    });
});

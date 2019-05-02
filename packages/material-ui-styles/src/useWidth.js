import { useState, useEffect } from 'react';

export default function useWidth(theme) {
    const [width, setWidth] = useState('');

    // differs from use
    // always run on when media match fires, not only on mount unmount
    useEffect(() => {
        function listener(e) {
            this.matched = e.matches;
            if (e.matches) {
                setWidth(this.name);
            }
        }
        const state = {};
        const filter = theme.breakpoints.keys;
        for (let i = 0; i < filter.length; i++) {
            const propName = filter[i];
            const obj = {};
            state[propName] = obj;
            obj.name = propName;
            obj.only = theme.breakpoints.only(propName).replace(/^@media\s+(.*)$/, '$1');
            obj.mql = window.matchMedia(obj.only);
            obj.listener = listener; // because of "this"
            obj.mql.addListener(listener);
            // kickoff
            if (obj.mql.matches && width !== obj.name) {
                // console.log(`size:${propName}:${obj.only}`);
                setWidth(obj.name);
            }
        }
        return function removeAll() {
            for (let i = 0; i < filter.length; i++) {
                const propName = filter[i];
                state[propName].mql.removeListener(listener);
            }
        };
    });
    return width;
}

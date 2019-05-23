import React from 'react';

import AlertDialog from './AlertDialog';

describe('show dialog', () => {
    it('show dialog...', () => {
        expect(AlertDialog.show('MyAppTitle', 'MyMessage')).toBe(Promise);
    });
});

describe('show dialog confirm', () => {
    it('show dialog confirmable...', () => {
        expect(AlertDialog.show('MyAppTitle', 'MyMessage', { confirmable: true })).toBe(Promise);
    });
});
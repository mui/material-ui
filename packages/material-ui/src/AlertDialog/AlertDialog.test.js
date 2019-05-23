import React from 'react';

import AlertDialog from './AlertDialog';

describe('show dialog', () => {
    it('show dialog confirmable...', () => {
        AlertDialog.show('MyAppTitle', 'MyMessage');
    });
});

describe('show dialog confirm', () => {
    it('show dialog confirmable...', () => {
        AlertDialog.show('MyAppTitle', 'MyMessage', { confirmable: true });
    });
});
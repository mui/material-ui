import { expect } from 'chai';
import extractTemplates from './extractTemplates';

describe('extractTemplates', () => {
  it('get correct templates', () => {
    const result = extractTemplates({
      './email/App.tsx': {
        default: '',
      },
      './team/App.tsx': {
        default: '',
      },
      './files/App.tsx': {
        default: '',
      },
    });
    expect(Object.keys(result)).to.deep.equal(['email', 'team', 'files']);
  });

  it('extract correct template files', () => {
    const result = extractTemplates({
      './email/App.tsx': {
        default: '',
      },
      './email/components/Layout.tsx': {
        default: '',
      },
      './email/components/MailContent.tsx': {
        default: '',
      },
      './email/components/Mails.tsx': {
        default: '',
      },
      './email/components/Navigation.tsx': {
        default: '',
      },
      './email/theme.tsx': {
        default: '',
      },
    });
    expect(result.email.files).to.deep.equal({
      'App.tsx': '',
      'components/Layout.tsx': '',
      'components/MailContent.tsx': '',
      'components/Mails.tsx': '',
      'components/Navigation.tsx': '',
      'theme.tsx': '',
    });
  });

  it('extract code variant', () => {
    const result = extractTemplates({
      './email/App.js': {
        default: '',
      },
      './email/components/Layout.js': {
        default: '',
      },
      './email/components/MailContent.js': {
        default: '',
      },
      './email/components/Mails.js': {
        default: '',
      },
      './email/components/Navigation.js': {
        default: '',
      },
      './email/theme.tsx': {
        // this is tsx
        default: '',
      },
    });
    expect(result.email.codeVariant).to.equal('TS');
  });
});

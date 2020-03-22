import { expect } from 'chai';
import { createFilterOptions } from './useAutocomplete';

describe('createFilterOptions', () => {
  it('defaults to getOptionLabel for text filtering', () => {
    const filterOptions = createFilterOptions();

    const getOptionLabel = (option) => option.name;
    const options = [
      {
        id: '1234',
        name: 'cat',
      },
      {
        id: '5678',
        name: 'dog',
      },
      {
        id: '9abc',
        name: 'emu',
      },
    ];

    expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([options[0]]);
  });
});

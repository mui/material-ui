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

  describe('option: limit', () => {
    it('limits the number of suggested options to be shown', () => {
      const filterOptions = createFilterOptions({ limit: 2 });

      const getOptionLabel = (option) => option.name;
      const options = [
        {
          id: '1234',
          name: 'a1',
        },
        {
          id: '5678',
          name: 'a2',
        },
        {
          id: '9abc',
          name: 'a3',
        },
        {
          id: '9abc',
          name: 'a4',
        },
      ];

      expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([
        options[0],
        options[1],
      ]);
    });
  });

  describe('option: matchFrom', () => {
    let filterOptions;
    let getOptionLabel;
    let options;
    beforeEach(() => {
      filterOptions = createFilterOptions({ matchFrom: 'any' });
      getOptionLabel = (option) => option.name;
      options = [
        {
          id: '1234',
          name: 'ab',
        },
        {
          id: '5678',
          name: 'ba',
        },
        {
          id: '9abc',
          name: 'ca',
        },
      ];
    });

    describe('any', () => {
      it('show all results that match', () => {
        expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(options);
      });
    });

    describe('start', () => {
      it('show only results that start with search', () => {
        expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(options);
      });
    });
  });

  describe('option: ignoreAccents', () => {
    it('does not ignore accents', () => {
      const filterOptions = createFilterOptions({ ignoreAccents: false });

      const getOptionLabel = (option) => option.name;
      const options = [
        {
          id: '1234',
          name: 'áb',
        },
        {
          id: '5678',
          name: 'ab',
        },
        {
          id: '9abc',
          name: 'áe',
        },
        {
          id: '9abc',
          name: 'ae',
        },
      ];

      expect(filterOptions(options, { inputValue: 'á', getOptionLabel })).to.deep.equal([
        options[0],
        options[2],
      ]);
    });
  });

  describe('option: ignoreCase', () => {
    it('matches results with case insensitive', () => {
      const filterOptions = createFilterOptions({ ignoreCase: false });

      const getOptionLabel = (option) => option.name;
      const options = [
        {
          id: '1234',
          name: 'Ab',
        },
        {
          id: '5678',
          name: 'ab',
        },
        {
          id: '9abc',
          name: 'Ae',
        },
        {
          id: '9abc',
          name: 'ae',
        },
      ];

      expect(filterOptions(options, { inputValue: 'A', getOptionLabel })).to.deep.equal([
        options[0],
        options[2],
      ]);
    });
  });
});

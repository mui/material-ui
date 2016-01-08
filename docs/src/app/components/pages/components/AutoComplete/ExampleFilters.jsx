import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

const fruit = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Bilberry',
  'Blackberry',
  'Blackcurrant',
  'Blueberry',
  'Boysenberry',
  'Cantaloupe',
  'Currant',
  'Cherry',
  'Cherimoya',
  'Cloudberry',
  'Coconut',
  'Cranberry',
  'Damson',
  'Date',
  'Dragonfruit',
  'Durian',
  'Elderberry',
  'Feijoa',
  'Fig',
  'Goji berry',
  'Gooseberry',
  'Grape',
  'Raisin',
  'Grapefruit',
  'Guava',
  'Huckleberry',
  'Jabouticaba',
  'Jackfruit',
  'Jambul',
  'Jujube',
  'Juniper berry',
  'Kiwi fruit',
  'Kumquat',
  'Lemon',
  'Lime',
  'Loquat',
  'Lychee',
  'Mango',
  'Marion berry',
  'Melon',
  'Cantaloupe',
  'Honeydew',
  'Watermelon',
  'Miracle fruit',
  'Mulberry',
  'Nectarine',
  'Olive',
  'Orange',
  'Blood Orange',
  'Clementine',
  'Mandarine',
  'Tangerine',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Persimmon',
  'Physalis',
  'Plum',
  'Pineapple',
  'Pumpkin',
  'Pomegranate',
  'Pomelo',
  'Purple Mangosteen',
  'Quince',
  'Raspberry',
  'Salmonberry',
  'Rambutan',
  'Redcurrant',
  'Salal berry',
  'Satsuma',
  'Star fruit',
  'Strawberry',
  'Squash',
  'Tamarillo',
  'Tamarind',
  'Tomato',
  'Ugli fruit',
];

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

const AutoCompleteExampleFilters = () => (
  <div>
    <AutoComplete
      floatingLabelText="fuzzy search"
      filter={AutoComplete.fuzzyFilter}
      dataSource={fruit}
    />
    <br/>
    <AutoComplete
      floatingLabelText="case insensitive, colors"
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={colors}
    />
  </div>
);

export default AutoCompleteExampleFilters;

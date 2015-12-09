import React from 'react';

import {AutoComplete, Paper} from 'material-ui';
import ComponentDoc from '../../component-doc';
import CodeExample from '../../code-example/code-example';
import CodeBlock from '../../code-example/code-block';

import Code from 'auto-complete-code';

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

class AutoCompletePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorText: '',
    };
  }

  render() {

    const desc = 'This component is a type of TextField that allows user to see and select results as they type.';

    const componentInfo = [{
      name: 'props',
      infoArray: [{
        name: 'dataSource',
        type: 'array',
        header: 'optional',
        desc: 'Array of type string or type object that populate the auto complete list.',
      }, {
        name: 'errorText',
        type: 'string',
        header: 'optional',
        desc: 'See TextField docs.',
      }, {
        name: 'floatingLabelText',
        type: 'string',
        header: 'optional',
        desc: 'See TextField docs.',
      }, {
        name: 'fullWidth',
        type: 'string',
        header: 'optional',
        desc: 'See TextField docs.',
      }, {
        name: 'hintText',
        type: 'string',
        header: 'optional',
        desc: 'See TextField docs.',
      }, {
        name: 'showAllItems',
        type: 'bool',
        header: 'optional',
        desc: 'If true, the item list will not be filtered and will show when the ' +
          'control is focused (works like a drop down list).',
      }]}, {
        name: 'events',
        infoArray: [{
          name: 'onBlur',
          type: 'func',
          header: 'optional',
          desc: 'Gets called with the control loses focus',
        }, {
          name: 'onChange',
          type: 'func',
          header: 'optional',
          desc: 'Gets called with the value when a value is selected',
        }, {
          name: 'onUpdateInput',
          type: 'func',
          header: 'optional',
          desc: 'Gets called with the control gets focus',
        }, {
          name: 'onUpdateInput',
          type: 'func',
          header: 'optional',
          desc: 'Gets called with the next searchText value each time the user updates the text field',
        }],
      },
    ];

    return (
      <ComponentDoc
        name="Auto Complete"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nimport AutoComplete from \'material-ui/lib/auto-complete\';\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>

          <AutoComplete
            dataSource={fruit}
            floatingLabelText="Simple Example"
            hintText="Search for a fruit" />

          <AutoComplete
            dataSource={fruit}
            errorText={this.state.errorText}
            floatingLabelText="Error Text Example"
            fullWidth={true}
            hintText="Search for a fruit"
            onUpdateInput={(newSearch) => {
              this.setState({
                errorText: fruit.indexOf(newSearch) !== -1 ? '' : 'Please select a valid fruit.',
              });
            }} />

          <AutoComplete
            dataSource={colors}
            fullWidth={true}
            floatingLabelText="showAllItems Example"
            hintText="Select a color"
            showAllItems={true} />

        </CodeExample>

      </ComponentDoc>
    );

  }


}

export default AutoCompletePage;

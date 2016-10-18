import React, {Component} from 'react';
import Form from 'material-ui/Form';
import FormItem from 'material-ui/FormItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

@Form.create()
export default class FormInlineExample extends Component {
  render() {
    return (
      <Form inline={true}>
        <FormItem>
          <TextField name="user" />
        </FormItem>
        <FormItem>
          <RaisedButton label="submit" />
        </FormItem>
      </Form>
    );
  }
}


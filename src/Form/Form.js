import React, {Component, createElement, PropTypes} from 'react';
import asyncValidator from 'async-validator';

export default class Form extends Component {
  static create = () => (ComposedComponent) => class FromCreator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: {},
        fieldsBackup: {},
        loading: false,
      };
    }

    fieldsBackup = {};

    // Public Methods
    /**
     * Get the value of a field.
     * @param name string
     * @return any
     */
    getFieldValue = (name) => {
      const props = this.state.fields[name];
      return props.value || props.first ? props.defaultValue : undefined;
    };

    /**
     * Get the specified fields' values. If you don't specify a parameter, you will get all fields' values.
     * @param names array:string
     * @returns object
     */
    getFieldsValue = (names = Object.keys(this.state.fields)) => {
      const values = {};
      names.forEach((name) => {
        values[name] = this.getFieldValue(name);
      });

      return values;
    };

    /**
     * Set the value and error of a field.
     * @param fields object
     */
    setFields = (fields = {}) => {
      const currentProps = this.state.fields;
      Object.keys(fields).forEach((fieldName) => {
        currentProps[fieldName] = {...currentProps[fieldName], ...fields[fieldName]};
      });
      this.setState({fields: currentProps});
    };

    /**
     * Set the value of a field.
     * @param fields object
     */
    setFieldsValue = (fields = {}) => {
      const currentFields = this.state.fields;
      Object.keys(fields).forEach((fieldName) => {
        currentFields[fieldName] = {...currentFields[fieldName], ...fields[fieldName]};
      });
      this.setState({fields: currentFields});
    };

    /**
     * Validate the specified fields and get theirs values and errors.
     * @param fields
     * @param callback
     */
    validateFields = (fields, callback) => {
      if (!fields) callback = fields;
      fields = Object.keys(this.state.fields);

      // get value and validate
      const values = this.getFieldsValue(fields);
      this.handleValidate(values, callback);
    };

    /**
     * generate field props
     * @param name string field name
     * @param props object rules
     */
    getFieldProps = (name, props) => {
      // create state
      if (!this.state.fields[name]) {
        const fields = {
          ...this.state.fields,
          [name]: {
            ...props,
            first: true,
          },
        };
        this.setState({fields});
        this.fieldsBackup = fields;
      }
      return {
        name,
        value: this.getFieldsValue(name),
        defaultValue: null,
        onChange: this.setFieldsValue(name),
        errorText: this.getFieldsErrorText(name),
      };
    };

    // private methods

    /**
     * Validate the specified field's value
     * @param fields object
     * @param callback function
     */
    handleValidate = (fields, callback) => {
      const props = this.state.fields;
      const descriptions = {};

      Object.keys(fields).forEach((fieldName) => {
        props[fieldName] = {
          ...props[fieldName],
          validating: true,
        };
        return this.state.fields[fieldName].rules;
      });

      this.setState({
        fields: props,
      });

      // validate
      asyncValidator.validate(fields, descriptions, (errors, values) => {
        // set all fields
        Object.keys(fields).forEach((fieldName) => {
          props[fieldName] = {
            ...props[fieldName],
            value: values[fieldName],
            validating: false,
            errors: errors[fieldName].errors,
          };
        });

        callback(errors, values);
      });
    };

    formProps = (() => {
      const {getFieldValue, getFieldsValue, setFields, setFieldsValue, validateFields, getFieldProps} = this;
      return {
        getFieldValue,
        getFieldsValue,
        setFields,
        setFieldsValue,
        validateFields,
        getFieldProps,
      };
    })();

    render() {
      return createElement(ComposedComponent, {
        form: this.formProps,
      });
    }
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Form.propTypes = {
  children: PropTypes.element,
  inline: PropTypes.boolean,
  onSubmit: PropTypes.func,
  title: PropTypes.node,
};

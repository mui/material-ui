let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let TextField = require('./text-field');
let DropDownMenu = require('./drop-down-menu');


let SelectField = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    selectFieldRoot: React.PropTypes.string,
    underlineStyle: React.PropTypes.string,
    labelStyle: React.PropTypes.string,
    hintText: React.PropTypes.string,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
    rows: React.PropTypes.number,
    inputStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    floatingLabelStyle: React.PropTypes.object,
    autoWidth: React.PropTypes.bool,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps() {
    return {};
  },

  getStyles() {
    let styles = {
      selectField:{
        root: {
          height:'48px',
          position:'relative',
          width:'100%',
          top: '18px'
        },
        label: {
          paddingLeft:0,
          top:4,
          width:'100%'
        },
        icon: {
          top:20,
          right:0
        },
        underline: {
          borderTop:'none'
        }
      }
    };
    return styles;
  },

  onChange(e, index, payload) {
    if (payload)
      e.target.value = payload[this.props.valueMember] || payload;

    if (this.props.onChange)
      this.props.onChange(e);
  },

  render() {
    let styles = this.getStyles();
    return (
      <TextField {...this.props}>
        <DropDownMenu {...this.props}
          onChange={this.onChange}
          style={this.mergeAndPrefix(styles.selectField.root, this.props.selectFieldRoot)}
          labelStyle={this.mergeAndPrefix(styles.selectField.label, this.props.labelStyle)}
          iconStyle={this.mergeAndPrefix(styles.selectField.icon, this.props.iconStyle)}
          underlineStyle={this.mergeAndPrefix(styles.selectField.underline, this.props.underlineStyle)}
          autoWidth={false}
        />
      </TextField>
    );
  }
});

module.exports = SelectField;

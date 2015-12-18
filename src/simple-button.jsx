import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

let SimpleButton = React.createClass({

  render() {
    const {label, primary, secondary, onClick} = this.props;

    function returnButtonClass(first, second) {
      if (first) {
        return 'button primary';
      }
      if (second) {
        return 'button secondary';
      }
      return 'button orange';
    }

    let cssClass = returnButtonClass(primary, secondary);

    return (
      <button className={cssClass} type="button" onClick={onClick}>{label}</button>
    );
  },
});

SimpleButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};
export default SimpleButton;

import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

let LinkButton = React.createClass({

  render() {
    const {label, primary, secondary, url, target, onClick } = this.props;

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
		<a className={cssClass} type="button" href={url} target={target || '_self'} onClick={onClick}>{label}</a>
    );
  },
});

LinkButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	url: PropTypes.string.isRequired,
	target: PropTypes.string
};
export default LinkButton;

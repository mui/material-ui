import React, {Component, PropTypes} from 'react'; // eslint-disable-line no-unused-vars

class SimplePopup extends Component {
  render() {
    const {popupState, hidePopup, header, content} = this.props;

    return (
      <div className={'simple-popup ' + popupState}>
        <div className="content-wrapper">
          <div className="button-close black" onClick={hidePopup}></div>
          <div className="popup-header">{header}</div>
          <div className="content-placeholder">
            {content}
          </div>
        </div>
    </div>
    );
  }
}

SimplePopup.propTypes = {
  header: PropTypes.string,
  content: PropTypes.object.isRequired,
  popupState: PropTypes.string.isRequired,
  hidePopup: PropTypes.func.isRequired
};

SimplePopup.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default SimplePopup;

import React, {Component, PropTypes} from 'react'; // eslint-disable-line no-unused-vars

class SimplePopup extends Component {
  render() {
    const {dialogState, hideDialog, content} = this.props;

    return (
      <div className={'simple-popup ' + dialogState}>
        <div className="take-over-wrapper">
          <div className="content-wrapper">
            <div className="button-close black" onClick={hideDialog}></div>
            <div className="content-placeholder">
              {content}
            </div>
          </div>
        </div>
    </div>
    );
  }
}

SimplePopup.propTypes = {
  content: PropTypes.object.isRequired,
  dialogState: PropTypes.string.isRequired,
  hideDialog: PropTypes.func.isRequired
};

SimplePopup.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default SimplePopup;

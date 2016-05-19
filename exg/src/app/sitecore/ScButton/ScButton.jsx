import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScButton.scss';

class ScButton extends Component {
    render(){
        const { text, isFullWidth, buttonType, disabled } = this.props;
        
        if(!text) {
            console.log('noText');
        }
        
        //default inverse primary
        //btn-full-width
        return (<button styleName="button" disabled={disabled} type="button">
            <span styleName="text">{text}</span>
            </button>);
    }
}

ScButton.defaultProps = { disabled: false };

export default CSSModules(ScButton, styles);
import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScText.scss';

class ScText extends Component {
    render(){
        const { text } = this.props;
        
        return (<span styleName="text">{text}</span>);
    }
}

ScText.defaultProps = { type: 'normal' };

export default CSSModules(ScText, styles);
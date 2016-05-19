import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScNavigationContainer.scss';

class ScNavigationContainer extends Component {
    
    static propTypes = {
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object
    };
    
    render(){
        const {style} = this.props;
        
        const styles = Object.assign({}, style);
         
        return (<div style={styles} styleName="navigationContainer">{this.props.children}</div>);
    }
}

export default CSSModules(ScNavigationContainer, styles);
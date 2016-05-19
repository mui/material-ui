import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScMainContainer.scss';

class ScMainContainer extends Component {
    
    static defaultProps = {
        noMenu: false
    };
    
    static propTypes = {
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object,
        /**
         * Removes the padding-left necesssary for the menu
         */
        noMenu: PropTypes.bool
    };
    
    render(){
        const { noMenu, style } = this.props;
        let styles = {};
        
        if( noMenu ) {
            styles = Object.assign({
                paddingLeft: '0'
            }, style);
        }
        
        return (<div style={styles} styleName="container">{this.props.children}</div>);
    }
}

export default CSSModules(ScMainContainer, styles);
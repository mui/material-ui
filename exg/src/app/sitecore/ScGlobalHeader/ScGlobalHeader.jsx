import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScGlobalHeader.scss';

class ScGlobalHeader extends Component {
  
    static propTypes = {
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object
    };
    
    render(){
        const { style } = this.props;
        const styles = Object.assign({}, style);
        
        return (
          <header style={styles} styleName="globalHeader">
            {this.props.children}  
          </header>
        );
    }
}

export default CSSModules(ScGlobalHeader, styles);
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScActionBar.scss';

class ScActionBar extends Component {
    
    static propTypes = {
        /**
         * Override the components that would be place in the Back zone placeholder ( by default nothing ).
         */
        backElements: PropTypes.node,
        /**
         * Override the components that would be place in the Action zone placeholder ( by default nothing ).
         */
        actionComponents: PropTypes.node,
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object
    };
    
    render(){

        let backComponentss;
        let actionComponents;
        
        const { backElements, actionElements, style } = this.props;
        const styles = Object.assign({}, style);
               
        if(backElements) {
            backComponentss = <div styleName="back">{backElements}</div>;
        } 
        
        if(actionElements) {
            actionComponents = <div styleName="action">{actionElements}</div>
        }
        
        return (
          <section style={styles} styleName="actionBar">
            {backComponentss}
            {this.props.children} 
            {actionComponents} 
          </section>
        );
    }
}

export default CSSModules(ScActionBar, styles);
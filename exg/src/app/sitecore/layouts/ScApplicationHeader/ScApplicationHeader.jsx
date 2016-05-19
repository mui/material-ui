import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScApplicationHeader.scss';

class ScApplicationHeader extends Component {
    
    static propTypes = {
        /**
         * Override the title ( no default value is provided )
         */
        title: PropTypes.string,
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object
    };
    
    render(){
        const { title, style } = this.props;
        const styles = Object.assign({}, style);
         
        return (<header style={styles} styleName="applicationHeader">
                    <div styleName="applicationHeaderContent">
                        <span styleName="title">{title}</span>
                        {this.props.children}
                    </div>
                </header>);
    }
}

export default CSSModules(ScApplicationHeader, styles); 
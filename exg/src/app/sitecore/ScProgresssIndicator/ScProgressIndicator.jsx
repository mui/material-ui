import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScProgressIndicator.scss';

class ScProgressIndicator extends Component {
    
    static propTypes = {
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object,
        show: PropTypes.bool,
        size: PropTypes.string
    };
    
    render(){
        let {style, show, size} = this.props;
        let styleName = "loading";
        
        style = style || {};
        
        if(show) {
            style.display = 'block';
        }
        
        if(size === "small") {
            styleName = "loadingSmall";
        }
         
        return (<div style={style} styleName={styleName}></div>);
    }
}

export default CSSModules(ScProgressIndicator, styles);
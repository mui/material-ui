import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ScGlobalLogo.scss';

class ScGlobalLogo extends Component {
    
    static defaultProps = {
        link: '/sitecore/shell/sitecore/client/Applications/Launchpad'
    };
    
    static propTypes = {
        /**
         * Override the method for clicking on the logo
         */
        onClick: PropTypes.func,
        /**
         * Override the link when you click on the logo ( a default value is provided )
         */
        link: PropTypes.string,
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object
    };
    
    onClickHandler (e ) {
         const { onClick } = this.props;
         
         if( onClick ) {
             e.preventDefault();
             onClick();
         }
    }
    
    render(){
        const { link, style } = this.props;
        const styles = Object.assign({}, style);
        
        return (<a href={link} onClick={this.onClickHandler.bind(this)} style={styles} styleName="logo"></a>);
    }
}

export default CSSModules(ScGlobalLogo, styles);
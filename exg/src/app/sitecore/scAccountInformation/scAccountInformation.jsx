import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './scAccountInformation.scss';
import Icon from './Astrologer.png'

class scAccountInformation extends Component {
    
    logoutHandler() {
        const { onLogout } = this.props;
        
        onLogout();
    }
    
    render(){
        const { username } = this.props;
        return (
            <ul styleName="accountInfo">
                <li>
                    <a styleName="logout" onClick={this.logoutHandler.bind(this)} href="#">Logout</a>
                </li>
                <li>
                    {username}
                    <img src={Icon} />
                </li>
            </ul>
        );
    }
}

export default CSSModules(scAccountInformation, styles); 
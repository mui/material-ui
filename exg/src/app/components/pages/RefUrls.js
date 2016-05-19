import React, { Component } from 'react';

class Page extends Component {
    render() {
        return (
            <div>{window.location.hash}</div>
        );
    }
}

export default Page;
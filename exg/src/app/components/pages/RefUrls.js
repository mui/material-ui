import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class AddRefUrlComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            inputValue: ''
        };
    }
    addRefUrlHandler() {
        const { onAddRefUrl } = this.props;
        
        if(this.state.inputValue) {
            onAddRefUrl(this.state.inputValue);
        }
        
        this.setState({
            inputValue: ''
        });
    }
    onInputValueChangeHandler(e, value) {
        this.setState({
            inputValue: value
        });
    }
    render () {
        return  (<Card>
                    <CardHeader title="Ref URL Input" actAsExpander={false} showExpandableButton={false}/>
                    <div style={{
                        padding:'15px'
                    }} className="row">
                        <div className="col s8">
                            <TextField fullWidth={true} onChange={this.onInputValueChangeHandler.bind(this)} value={this.state.inputValue} hintText="eg: https://www.example.com?parameter=yes"></TextField>
                        </div>
                        <div className="col s4">
                            <RaisedButton style={{marginTop:'15px'}} onClick={this.addRefUrlHandler.bind(this)} label="Add Ref Url"></RaisedButton>
                        </div>
                    </div>
                </Card>);
    } 
}

class RefUrlListComponentItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            sliderValue: 0.5
        }
    }
    onDeleteUrlHandler(value) {
        const {onDeleteUrl} = this.props;
        
        onDeleteUrl(value);
    }
    
    handleSlider(e, value) {
        console.log(value);
        this.setState({sliderValue: value});
    }
    render() {
        const {urlRef} = this.props;
        
        return (<div style={{ lineHeight: '66px', borderBottom: '1px solid #000'}} className="row">
            <div className="col s6">{urlRef.url}</div>
            <div className="col s4">
                <Slider
                    defaultValue={0.5}
                    style={{
                        marginBottom: '24px'
                    }}
                    value={urlRef.value} onChange={this.handleSlider.bind(this)}
                    />
            </div>
            <div style={{textAlign: 'right'}} className="col s2">
                <RaisedButton onClick={this.onDeleteUrlHandler.bind(this, urlRef)} label="Delete"></RaisedButton>
            </div>
        </div>);
    }    
}

class RefUrlListComponent extends Component {
    render() {
        const { urls, onDeleteUrl } = this.props;
        const cardContentStyle = {
          minHeight: '30px',
          padding: '15px'
        };
        
        return (<Card >
                    <CardHeader title="Ref URL" actAsExpander={false} showExpandableButton={false}/>
                    <div style={cardContentStyle}>
                        {urls.map((urlRef, index)=>{
                            return (<RefUrlListComponentItem key={index} onDeleteUrl={onDeleteUrl} urlRef={urlRef}></RefUrlListComponentItem>)
                        })}  
                    </div>          
                </Card>);
    }
}

class Page extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            urlList: [] //move this in a redux store
        };
    }
    
    onDeleteUrlHandler(value) {
        
        let filteredUrls = this.state.urlList.filter((urlRef)=>{
            return urlRef.url !== value.url;
        })
        
        this.setState({
            urlList: filteredUrls
        });
    }
    
    onAddRefUrlHandler(value) {
        this.setState({urlList: this.state.urlList.concat([{ url: value, value: 0.5 }])}); //concat to re-render the Component.
    }
    render() {
        const spacingStyle = { marginTop:'15px' };
        return (
            <div>
                <div style={spacingStyle}>
                    <AddRefUrlComponent onAddRefUrl={this.onAddRefUrlHandler.bind(this)}></AddRefUrlComponent>
                </div>
                <div style={spacingStyle}>
                    <RefUrlListComponent onDeleteUrl={this.onDeleteUrlHandler.bind(this)} urls={this.state.urlList}></RefUrlListComponent>
                </div>
            </div>
        );
    }
}

export default Page;
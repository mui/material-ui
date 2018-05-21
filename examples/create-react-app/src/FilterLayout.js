import React, { Component } from 'react';
import CardList from './components/CardsList';
import { fetchBusses } from './actionCreators/actions';

class FilterLayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            busList: undefined
        }
    }

    componentDidMount(){
        fetchBusses(responsePayload => {
            console.log(responsePayload);
            let busList = [];
            for(let key in responsePayload){
                let fare = responsePayload[key].fare.substring(responsePayload[key].fare.lastIndexOf(" ")+1) //extend this for currency calculations if required
                let eachBus = {
                    travels: responsePayload[key].travels,
                    fare: `₹ ${fare}`,
                    depature: this.getInTimeFormat(responsePayload[key].depature),
                    arrival: this.getInTimeFormat(responsePayload[key].arrival),
                    bus_type: responsePayload[key].bus_type,
                    jurneyTime: responsePayload[key].diff
                };
                busList.push(eachBus);
            }
            this.setState({busList: busList})
        })
    }

    getInTimeFormat(timeStamp){
        let time = new Date(timeStamp);
        return time.toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true })
    }

    render(){
        let cardListConfig = {
            busList: this.state.busList
        }
        return(
            <CardList {...cardListConfig} />
        );
    }

}

export default FilterLayout;
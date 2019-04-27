import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import fetchJsonp from 'fetch-jsonp';

class MeetingRSVP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail:[],
    };
  }

  componentDidMount(){
       var current = window.location.pathname.split('/')[2];
       console.log(current);
       var that = this;
        fetchJsonp('https://api.meetup.com/reactjs-dallas/events/'+current+'?&sign=true&photo-host=public&key=6355377e1f786e636469776b7e6c4844')
          .then(function(response) {
            return response.json()
          }).then(function(json) {
            console.log('parsed json', json.data);
            that.setState({ detail: json.data});
          }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
        
  }

  render() {
    const { classes } = this.props;
    const { detail } = this.state;
    if (!this.state.detail.venue) {
      return null;
    }
    

      return (
        <div className='container'>
        <Link to={`/`}><Button size="small">Back to all events</Button></Link>
            <h1>{detail.name}</h1>
            <h4>Date: {detail.local_date}, {detail.local_time} ; {detail.status}</h4>
            <h5>Going: {detail.yes_rsvp_count}; Waitlist: {detail.waitlist_count}</h5>
            <p className='description' dangerouslySetInnerHTML={{__html: detail.description}}></p>
            <br />
         <h4> Venue: {detail.venue.name}, {detail.venue.address_1} {detail.venue.city} {detail.venue.state} {detail.venue.country}</h4> 
        
          
                     
        </div>
      );
    
  }
}



export default MeetingRSVP;

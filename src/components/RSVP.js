import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import fetchJsonp from 'fetch-jsonp';

const emails = ['username@gmail.com', 'user02@gmail.com'];


class RSVP extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      rsvps: [],
      open:false,
      isLoaded:false,
      id:'',
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.id){
      this.state.id = nextProps.id;
      console.log(nextProps.id);
    }
    

    if(this.state.id != ''){
    var that = this;
    fetchJsonp('https://api.meetup.com/reactjs-dallas/events/'+this.state.id+'/rsvps?photo-host=public&key=6355377e1f786e636469776b7e6c4844')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json.data);
        that.setState({ 
          isLoaded:true,
          rsvps: json.data
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
    }
  }

  render() {
    const { classes, onClose, id, selectedValue, ...other } = this.props;
    
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="meetup-attendees" {...other} maxWidth='md'
          fullWidth= 'false'>
        <DialogTitle id="meetup-attendees">Meetup Attendees</DialogTitle>
        <div>
          <div>
            {this.state.isLoaded && this.state.rsvps.map(data => (
              <div key={data.member.name}>
                <ListItemAvatar>
                  <Avatar className='avatar'>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <p className='name'> {data.member.name} </p>
                <p className='status'> Response: {data.response} </p>
                <p className='status'> Guests: {data.guests} </p>
                <p className='venue status'> Venue: {data.venue.name}, {data.venue.address_1} {data.venue.city} {data.venue.state} {data.venue.country} </p>
                <div className='clearfix divide'></div>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    );
  }
}



export default RSVP ;
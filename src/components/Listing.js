import React, { Component } from 'react';
import { Link, BrowserRouter, withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import fetchJsonp from 'fetch-jsonp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import RSVP from './RSVP';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meets: [],
      open:false,
      id:'',
    };
  }

  componentWillMount(){
    var that = this;
    fetchJsonp('https://api.meetup.com/2/events?key=6355377e1f786e636469776b7e6c4844&group_urlname=reactjs-dallas&sign=true')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json.results);
        that.setState({ meets: json.results});
      }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
  }

   handleClickOpen = (id) => {
    this.setState({
      open: true,
      id:id,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  showRSVPs = (id) => {
    this.props.history.push(`/details/${id}`, { 'id': id });
  }

  render() {
    const { classes } = this.props;
    const { history } = this.props;
      return (
        <div className='container'>
            <Grid container spacing={24} >
              {
                this.state.meets.map((val, key) => {
                  const regex = /(<([^>]+)>)/ig;
                  const result = val.description.replace(regex, '');

                  return(
                    <Grid item xs={4} key={key} className='grid3'>
                      <Card className='card' >
                      <CardContent>
                        <Typography variant="h5" component="h2">
                         {val.name}
                        </Typography>
                        <Typography className='pos' color="textSecondary">
                          {val.yes_rsvp_count} people going
                        </Typography>
                        <Typography component="p" className='limit'>
                          {result}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" variant='outlined' onClick={() => this.handleClickOpen(val.id)} >View RSVPs</Button> 
                        <Link to={`/details/${val.id}`}><Button size="small">Learn More</Button></Link>
                      </CardActions>
                    </Card>
                  </Grid>
                )
                })
              }
           </Grid>

          <RSVP
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            id={this.state.id}
            onClose={this.handleClose}
          />

        </div>
      );
    
  }
}


export default withRouter(Listing);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/AppBar';
import {
  Details,
} from './pages';

const theme = createMuiTheme({ 
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      // main: '#631712',
      main: '#1f282c',
      // dark: will be calculated from palette.primary.main,
      contrastText: "#ffffff",
    },
    secondary: {
      light: '#1f272d',
      main: '#bb7d18',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffffff',
    },
    // error: will use the default color
  },
});

// ReactDOM.render(<App />,

ReactDOM.render(

	<MuiThemeProvider theme={theme}>
	  <Router>
	     <div className="App">
	     	<Header />
		     <Switch>
		      <Route exact path="/" component={App} />
		      <Route path="/details/:id" component={Details} />
		      </Switch>
		    </div>
	  </Router>
	 
	 </MuiThemeProvider>
	,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

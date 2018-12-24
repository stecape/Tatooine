import React, { Component } from 'react'
import Template from './Template/Template'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../pages/Login'
import Quattrocentotre from '../pages/Quattrocentotre'
import Home from '../pages/Home'
import Controls from '../pages/Controls'
import Admin from '../pages/Admin'
import Cmd from '../components/Cmd'
import Logout from '../components/Logout'
import Loading from '../components/Loading'
import { withTracker } from 'meteor/react-meteor-data'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b71c1c',
    },
    secondary: {
      main: '#9e9e9e',
    }
  },
  typography: {
    useNextVariants: true,
  },
})

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			auth: this.props.hasUser,
      user: this.props.user
		}
	}

//keep state.auth update with the hasUser props provided by the HOC
	static getDerivedStateFromProps(nextProps, prevState){
	  if (nextProps !== prevState) {
	    return { auth: nextProps.hasUser, user:nextProps.user }
	  }
	  return null
	}

  render() {
  	var auth = this.state.auth  	
    return (
    	<div>
    	{/*If someone is logging in shows the Loading... component*/}
    	{	this.props.loggingIn && 
    		<Loading /> 
    	}
    	{/*If someone isn't logging in anymore and there is a user logged shows the normal view*/}
	    { !this.props.loggingIn && auth &&	

    				<BrowserRouter>
    					<MuiThemeProvider theme={theme}>
                <Template>
      						<Switch>
      	    				<Route exact path="/" render={() => {return <Home authorized={Roles.userIsInRole(this.props.user, ['ras', 'power user'])} /> }} />
          	
                    {/*Admin is a protected route, so if the user is a 'ras' Admin is loaded, else 403*/}
                    <Route path="/controls" render={() => { return (Roles.userIsInRole(this.props.user, ['ras', 'power user']) ? <Controls /> : <Quattrocentotre />) }} />
                    
                    {/*Admin is a protected route, so if the user is a 'ras' Admin is loaded, else 403*/}
                    <Route path="/admin" render={() => { return (Roles.userIsInRole(this.props.user, ['ras']) ? <Admin /> : <Quattrocentotre />) }} />

      							{/*cmd is a protected route, so if the user is a 'ras' Admin is loaded, else 403*/}
      	    				<Route path="/Cmd/:cmd" render={(props) => { return (Roles.userIsInRole(this.props.user, ['ras', 'power user']) ? <Cmd {...props}/> : <Quattrocentotre />) }} />

      	    				<Route render={() => {return <div>404 - Page not found</div>}} />
      						</Switch>
                </Template>
    					</MuiThemeProvider>
    				</BrowserRouter>
			}

			{/*if nobody is loggin in and nobody is logged in, show login screen*/}
			{ !this.props.loggingIn && !auth &&	
				<Login />
			}
			</div>
    )
  }
}

export default withTracker((props) => {
	
  return {
    loggingIn: Meteor.loggingIn(),
    hasUser: !!Meteor.user(),
  	user: Meteor.user() ? Meteor.user() : {}
  }
})(App)
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../pages/Login'
import Quattrocentotre from '../pages/Quattrocentotre'
import Home from '../pages/Home'
import Admin from '../pages/Admin'
import Logout from '../components/Logout'
import Loading from '../components/Loading'
import { withTracker } from 'meteor/react-meteor-data'

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			auth: this.props.hasUser
		}
	}

//keep state.auth update with the hasUser props provided by the HOC
	static getDerivedStateFromProps(nextProps, prevState){
	  if (nextProps.hasUser !== prevState.auth) {
	    return { auth: nextProps.hasUser }
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
					<div>
						<Logout user={this.props.user}/>
						<Switch>
	    				<Route exact path="/" render={() => {return <Home user={this.props.user}/>}} />
    	
    					{/*Admin is a protected route, so if the user is a 'ras' Admin is loaded, else 403*/}
	    				<Route path="/admin" render={() => { return (Roles.userIsInRole(this.props.user, ['ras']) ? <Admin /> : <Quattrocentotre />) }} />

	    				<Route render={() => {return <div>404 - Page not found</div>}} />
						</Switch>
					</div>
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
})(App);
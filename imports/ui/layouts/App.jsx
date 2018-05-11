import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Logout from '../components/Logout'
import Loading from '../components/Loading'
import { withTracker } from 'meteor/react-meteor-data';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			auth: this.props.hasUser
		}
	}

	componentWillReceiveProps(nextProps) {
	  if (nextProps.hasUser !== this.state.auth) {
	    this.setState({ auth: nextProps.hasUser });
	  }
	}

  render() {
  	var auth = this.state.auth  	
    return (
    	<div>
    	{	this.props.loggingIn && 
    		<Loading /> 
    	}
	    { !this.props.loggingIn && auth &&	
				<BrowserRouter>
					<div>
						<Logout user={this.props.user}/>
						<Switch>
	    				<Route exact path="/" render={() => {return <Home user={this.props.user}/>}} />
	    				<Route render={() => {return <div>404 - Page not found</div>}} />
						</Switch>
					</div>
				</BrowserRouter>
			}

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
  	user: Meteor.user() ? Meteor.user() : {},
    isPublic( route ) {
      let publicRoutes = [
        'login'
      ];

      return publicRoutes.indexOf( route ) > -1
    },
    canView() {
      let USER = Meteor.user()
      return this.isPublic( this.props.location.pathname ) || ( !!USER ? USER.services.google.id == "103049458898347661484" : false )
    }
  };
})(App);
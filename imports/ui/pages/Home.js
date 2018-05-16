import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

  render () {

    //call to the google contacts API, for fetching the contacts of a user. 1 - Retrieve the access token from the server, 2 - Async call to google contacts api, 3 - Callback that logs the result or the error.
  	this.getContacts = () => {
      Meteor.call('fetchAcessToken', (error, accessToken) => { 
          return axios.get('https://www.google.com/m8/feeds/contacts/default/full?access_token=' + accessToken + "&alt=json&max-results=2000")
          .then( function (resp) {console.log(resp.data.feed.entry)} )
          .catch( function (error) {console.log(error)} )
      })
    }
  	return(
  		<div>
        {/*This render is conditioned by the role of the user: the link to the users management section is rendered only if the user is a 'ras'*/}
  			{ Roles.userIsInRole(this.props.user, ['ras']) && <Link to="/admin">Admin</Link> }
  			<button onClick={this.getContacts}>Click</button>
  		</div>
  	)
  }
}
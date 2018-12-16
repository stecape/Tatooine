import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  render () {

  	return(
  		<div>
        {/*This render is conditioned by the role of the user: the link to the users management section is rendered only if the user is a 'ras'*/}
  			{ Roles.userIsInRole(this.props.user, ['ras']) && <Link to="/admin">Admin</Link> }
  			<button onClick={() => Meteor.call('SendOWNCommand', "*1*1*17##")}>Luce 17 ON</button>
        <button onClick={() => Meteor.call('SendOWNCommand', "*1*0*17##")}>Luce 17 OFF</button>
  		</div>
  	)
  }
}
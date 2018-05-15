import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { usersData } from '../../api/users.js' 
import '../styles/Login.css'

class UsersList extends React.Component {
  render () {
  	return(
  		<tbody>
				{
					this.props.users.map((user) => {
						console.log(user)
			  		return (
			  			<tr key={user._id}>
				  			<td>{ typeof user.services !== 'undefined' ? user.services.google.name : "" }</td>
								<td>{ typeof user.services !== 'undefined' ? user.services.google.email : "" }</td>					
								<td>
									<form>
										<label htmlFor="ras">Ras</label>
										<input type="radio" name="rights" defaultChecked={ typeof user.roles !== 'undefined' ? user.roles.indexOf('ras') > -1 : false } value="ras" />
										<label htmlFor="power user">Power User</label>
										<input type="radio" name="rights" defaultChecked={ typeof user.roles !== 'undefined' ? user.roles.indexOf('power user') > -1 : false } value="power user" />
										<label htmlFor="user">User</label>
										<input type="radio" name="rights" defaultChecked={ typeof user.roles !== 'undefined' ? user.roles.indexOf('user') > -1 : false } value="user" />
									</form>
								</td>
							</tr>
			  		)
			  	})
				}
  		</tbody>
		)
  }
}


export default withTracker((props) => {
  Meteor.subscribe("usersData")
  return {
  	users: Meteor.users.find().fetch()
  }
})(UsersList);

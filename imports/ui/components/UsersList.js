import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import User from './User'

class UsersList extends React.Component {
	constructor(props){
		super(props)

		state = {
			users: this.props.users
		}
	}
  render () {
  	return(
  		<tbody>
				{
					this.props.users.map((user) => {
			  		return (
			  			<User key={user._id} user={user} />
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

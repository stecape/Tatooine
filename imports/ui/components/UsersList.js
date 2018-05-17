import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import User from './User'
import Loading from './Loading'

class UsersList extends React.Component {

	renderTBody() {
		if (this.props.loading) {
			return ( <tr><td><Loading /></td></tr> ) 
		} else {
			return this.props.users.map((user) => {
				return (
					<User 
						key		=	{user._id}
						_id		=	{user._id}
						name	=	{user.services.google.name}
						email	=	{user.services.google.email}
						roles	=	{user.roles}
					/>
				)
			})
		}
	}

	render () {
		return (
			<tbody>
				{ 
					this.renderTBody()
				}
			</tbody>
		)
	}
}


export default withTracker((props) => {
	var loading = true
	Meteor.subscribe("usersData", () => loading = false )
	return {
		loading: loading,
		users: Meteor.users.find().fetch()
	}
})(UsersList);

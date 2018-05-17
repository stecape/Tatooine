import React from 'react'
import PropTypes from 'prop-types'

export default class User extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			_id: "",
			name: "",
			email: "",
			roles: []
		}
	}

	//when props changes I got to compare the previous state and the next props.
	//you have to return null or an object that will be update the state.
	static getDerivedStateFromProps(nextProps, prevState){
		var changed = false
		var _state = {
			_id: prevState._id,
			name: prevState.name,
			email: prevState.email,
			roles: prevState.roles
		}
		
		if (nextProps._id !== prevState._id) {
			_state._id= nextProps._id
			changed = true
		}

		//I check the type because if the object isn't yet available, accessing his properties ends up with an error.
		if (nextProps.name !== prevState.name) {
			_state.name= nextProps.name
			changed = true
		}

		//I check the type because if the object isn't yet available, accessing his properties ends up with an error.
		if (nextProps.email !== prevState.email) {
			_state.email= nextProps.email
			changed = true
		}
		
		//I check the type because if the object isn't yet available, accessing his properties ends up with an error.
		if (nextProps.roles !== prevState.roles) {
			_state.roles= nextProps.roles
			changed = true
		}

		//If something has changed, i return the new state, else i return null
		return changed ? _state : null
	}

	//called when the admin clicks on a radio
	handleRoleChange = (changeEvent) => {
		var _id = this.state._id
		var roles = [changeEvent.target.value]
		Meteor.call('updateRoles', _id, roles)
	}

	render () {
		return(
			<tr>
				<td>{ this.state.name }</td>
				<td>{ this.state.email }</td>					
				<td>
					<form>
						<label htmlFor="ras">Ras</label>
						<input
							type="radio"
							name="rights"
							checked={ this.state.roles.indexOf('ras') > -1 }
							value="ras"
							onChange={this.handleRoleChange}
						/>
						<label htmlFor="power user">Power User</label>
						<input
							type="radio"
							name="rights"
							checked={ this.state.roles.indexOf('power user') > -1 }
							value="power user"
							onChange={this.handleRoleChange}
						/>
						<label htmlFor="user">User</label>
						<input
							type="radio"
							name="rights"
							checked={ this.state.roles.indexOf('user') > -1 }
							value="user"
							onChange={this.handleRoleChange}
						/>
					</form>
				</td>
			</tr>
		)
	}
}

User.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	roles: PropTypes.array.isRequired
}

User.defaultProps = {
	_id: "",
	name: "",
	email: "",
	roles: []
}
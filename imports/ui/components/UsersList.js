import React from 'react'
import '../styles/Login.css'

export default class UsersList extends React.Component {
  render () {
  	return(
  		<tbody>
				{
					Meteor.users.find().map((user) => {
						console.log(user)
			  		return (
			  			<tr key={user._id}>
				  			<td>{}</td>
								<td>{}</td>					
								<td>
									<form>
										<label htmlFor="ras">Ras</label>
										<input type="radio" name="rights" value="ras" />
										<label htmlFor="power user">Power User</label>
										<input type="radio" name="rights" value="power user" />
										<label htmlFor="user">User</label>
										<input type="radio" name="rights" value="user" />
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

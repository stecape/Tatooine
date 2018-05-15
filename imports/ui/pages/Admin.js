import React from 'react'
import UsersList from '../components/UsersList'

export default class Admin extends React.Component {

  render () {
  	return(
  		<div>
	  		<div>
	        Admin
	  		</div>
	  		<table style={{width: '100%', textAlign: 'center'}}>
		  		<thead>
		  			<tr>
		  				<th>Name</th>
		  				<th>Email</th>
		  				<th>Rights</th>
		  			</tr>
		  		</thead>
	  			<UsersList />
	  		</table>
	  	</div>
  	)
  }
}
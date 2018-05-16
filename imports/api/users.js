import { Mongo } from 'meteor/mongo'

//publishing user data on server
if (Meteor.isServer) {
	Meteor.publish('usersData', function () {
	  var data = Meteor.users.find(
			  	{ },
			  	{ 
			  		fields: {
			  			"roles": 1,
			  			"services.google.name": 1,
			  			"services.google.email": 1
			  		}
			  	}
			  )

		if ( data ) {
	    return data
	  }

	  return this.ready()
	})
}


Meteor.methods({

	//method called when an admin change the role of a user
	updateRoles(userId, roles) {
		var loggedInUser = Meteor.user()
		if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['ras'])) {
			throw new Meteor.Error(403, "Access denied")
		}
		Roles.setUserRoles(userId, roles)
	},

	//method called when a new user logs in. A default role is assigned
	initRole() {
		var loggedInUser = Meteor.user()
		var roles = Roles.getRolesForUser(loggedInUser).length
		if ( !!loggedInUser && roles == 0 ) {
			Roles.setUserRoles(loggedInUser, ['user'])
		}
	}
})
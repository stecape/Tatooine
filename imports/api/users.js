import { Mongo } from 'meteor/mongo'

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

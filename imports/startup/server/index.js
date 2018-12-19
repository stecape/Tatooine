import { Meteor } from 'meteor/meteor'
import '../../api/users.js'
import '../../api/googleApiCalls.js'
import { ServiceConfiguration } from 'meteor/service-configuration'
import './OWN/OWNMethods.js'

Meteor.startup(() => {

//Google oauth configuration
	ServiceConfiguration.configurations.upsert(
	  { service: 'google' },
	  {
  	  $set: {
  	  	loginStyle: 'redirect',
	    	clientId: Meteor.settings.private.oAuth.google.clientId,
	    	secret: Meteor.settings.private.oAuth.google.secret,
			accessType: 'offline'
      }
    }
	)


	//Se non ci sono amministratori, quando parte il server si prende il primo utente loggato in ordine cronologico e lo si rende amministratore.
	//Se c'è almeno un altro amministratore, non accade niente.
	var noAdminsYet = Meteor.users.find({roles: {  $in: ['ras'] }}).count() == 0
	var users = Meteor.users.find({}, { sort: { createdAt: 1 } } )
	noAdminsYet && users.count() > 0 && Roles.setUserRoles(users.fetch()[0]._id, ['ras'])

})
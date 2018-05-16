import { Meteor } from 'meteor/meteor'
import '../../api/users.js'
import '../../api/googleApiCalls.js'
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {

//Google oauth configuration
	ServiceConfiguration.configurations.upsert(
	  { service: 'google' },
	  {
  	  $set: {
	    	clientId: Meteor.settings.private.oAuth.google.clientId,
	    	secret: Meteor.settings.private.oAuth.google.secret
      }
    }
	)


	//Se non ci sono amministratori, quando parte il server si prende il primo utente loggato in ordine cronologico e lo si rende amministratore.
	//Se c'è almeno un altro amministratore, non accade niente.
	var noAdminsYet = Meteor.users.find({roles: {  $in: ['ras'] }}).count() == 0
	var users = Meteor.users.find({}, { sort: { createdAt: 1 } } )
	noAdminsYet && users.count() > 0 && Roles.setUserRoles(users.fetch()[0]._id, ['ras'])
})
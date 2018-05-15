import { Meteor } from 'meteor/meteor'
import './publications.js'
import { ServiceConfiguration } from 'meteor/service-configuration';
 
Meteor.startup(() => {
	ServiceConfiguration.configurations.upsert(
	  { service: 'google' },
	  {
  	  $set: {
	    	clientId: "828427357877-bd7ckf1hb25vfq31jfg4veiobgh7gobd.apps.googleusercontent.com",
	    	secret: "wwPVCvQoZSGOxvNg7SK8iZf6"
      }
    }
	)


	//Se non ci sono amministratori, quando parte il server si prende il primo utente loggato in ordine cronologico e lo si rende amministratore.
	//Se c'è almeno un altro amministratore, non accade niente.
	var noAdminsYet = Meteor.users.find({roles: {  $in: ['ras'] }}).count() == 0
	var users = Meteor.users.find({}, { sort: { createdAt: 1 } } )
	noAdminsYet && users.count() > 0 && Roles.addUsersToRoles(users.fetch()[0]._id, ['ras'])
})
import { Meteor } from 'meteor/meteor'
import '../../api/users.js'
import '../../api/googleApiCalls.js'
import { ServiceConfiguration } from 'meteor/service-configuration'

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

	// creating OWN connection to the F454
  var myhome = require('myhome')
  var mhengine = new myhome.engine({ 
    "host": "192.168.0.35",
    "port": "20000",
    "pass": "12345"
  })

  //When the "monitoring" is emitted, log it
  mhengine.on ('monitoring', function () { 
    console.log ('successfully connected, started monitoring') 
  })

  //how to intercept a packet:
	mhengine.on ('packet', function (pkt) {
    if (pkt == "*1*0*23##") console.log ('Luce 23 OFF') 
  })

  //if you want to send a command, do like this
  //mhengine.sendCommand({command: "*1*0*23##"})

})
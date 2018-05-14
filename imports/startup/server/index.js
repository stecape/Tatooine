import { Meteor } from 'meteor/meteor'
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
//	Roles.addUsersToRoles("kLJd3LXs9qhutwSa3", ['ras'])
})
import axios from 'axios'

Meteor.methods({
	//this method returns the access token for google requests 
	fetchAcessToken(){
		var accessToken = encodeURIComponent(Meteor.user().services.google.accessToken)
		return accessToken
	}
})
import React from 'react'
import axios from 'axios'

export default class Home extends React.Component {

  render () {
  	this.getPhotos = () => {
  		var config = {
        headers: 	{	
          'ContentType': 'application/json',
          'Authorization': 'bearer ' + this.props.user.services.google.accessToken
        }
   		}
   		var bodyParams = {
   			"pageSize":"100"
   		}
	    return axios.post(
	    	'https://photoslibrary.googleapis.com/v1/mediaItems:search',
	    	bodyParams,
	    	config
		  )
		  .then(function (resp) {console.log(resp)})
		  .catch(function (error) {console.log(error)})
  	}  	
  	this.getContacts = () => {
  		    return axios.get('https://www.google.com/m8/feeds/contacts/default/full?access_token=' + encodeURIComponent(this.props.user.services.google.accessToken) + "&alt=json&max-results=2000")
    .then(function (resp) {console.log(resp.data.feed.entry)})
  	}
  	return(
  		<div>
  			<button onClick={this.getContacts}>Click</button>
  			<button onClick={this.getPhotos}>Click</button>
  		</div>
  	)
  }
}
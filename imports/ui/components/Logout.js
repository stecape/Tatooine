import { Meteor } from 'meteor/meteor'
import React from 'react'
import '../styles/Login.css'

export default class Logout extends React.Component {
  render () {
 		
 		this.logout = () => {
 			Meteor.logout()
 		}
  	
  	return(
      <button className="customBtn" onClick={this.logout}>
        <span style={{"background": "url('/g-normal.png') transparent 5px 50% no-repeat"}} className="customBtn-icon"></span>
        <span className="customBtn-buttonText">Logout</span>
      </button>
    )
  }
}


import React from 'react'
import '../styles/Login.css'

export default class Login extends React.Component {
 
  render () {
    this.login = () => {
      Meteor.loginWithGoogle(
        {
          requestPermissions: ["https://www.google.com/m8/feeds/", "https://www.googleapis.com/auth/photoslibrary.readonly"],
          requestOfflineToken: true
        },
        (error) => {
          !!error ? console.log(error) : console.log(Meteor.user())
        }
      )
    }
    return (
      <div className="page">
        <button className="customBtn" onClick={this.login}>
          <span style={{"background": "url('/g-normal.png') transparent 5px 50% no-repeat"}} className="customBtn-icon"></span>
          <span className="customBtn-buttonText">Login with Google</span>
        </button>
      </div>
    )
  }
}
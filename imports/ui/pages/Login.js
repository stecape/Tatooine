import React from 'react'
import '../styles/Login.css'

export default class Login extends React.Component {

  //login page. button click -> Meteor.loginWithGoogle.
  // scopes array, offline token and callback.
  // the callback logs the error or tries initialize the role of the logged in user, if he is a new user.
  render () {
    this.login = () => {
      Meteor.loginWithGoogle(
        {
          requestPermissions: [
            "email",
            "profile",
            "https://www.google.com/m8/feeds/"
          ],
          requestOfflineToken: true
        },
        (error) => {
          !!error ? console.log(error) : Meteor.call('initRole')
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


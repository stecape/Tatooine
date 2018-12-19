import React from 'react'


export default class Cmd extends React.Component {

  render () {
  	var cmd = decodeURIComponent(this.props.match.params.cmd)
  	Meteor.call('SendOWNCommand', cmd)
  	return(
  		<div>
        CMD > {cmd}
  		</div>
  	)

  }
}
import React from 'react'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class Control extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data: this.props.data
		}
	}

//keep state.data update with the data props provided by the HOC
	static getDerivedStateFromProps(nextProps, prevState){
	  if (nextProps.data !== prevState.data) {
	    return { data: nextProps.data }
	  }
	  return null
	}

  render () {  
  	this.getControl = () => {
  		if (this.state.data.type == "switch") { 
        return (
        	<FormControlLabel
			      control={
		        	<Switch
		          	checked={this.state.data.status == "1"}
		          	onChange={() => this.toggle()}
		          	value={this.state.data.name}
		          	color={this.props.color}
					  	/>
				  	}
						label={this.state.data.name}
					/>
			  )
			}
			else if (this.state.data.type == "pulse") {
        return (
        	<FormControlLabel
			      control={
							<Button
								size="small"
			          onClick={() => this.pulse()}
						  >
								Apri
							</Button>
				  	}
						label={this.state.data.name}
					/>
			  )
			}
		}

	  this.toggle = () => {
			if (this.state.data.status=="1") {
				var value = "0"
			} else {
				var value = "1"
			}
			if (!this.props.override) {
				var cmd = "*1*" + value + "*" + this.state.data.env + this.state.data.light + "##"
			} else {
				var cmd = this.props.override	
			}
			Meteor.call('SendOWNCommand', cmd)
		}

	  this.pulse = () => {
			if (!this.props.override) {
				var cmd = "*1*18*" + this.state.data.env + this.state.data.light + "##"
			} else {
				var cmd = this.props.override	
			}
			Meteor.call('SendOWNCommand', cmd)
		}

		return(

	    <React.Fragment>
		    {this.getControl()}
	    </React.Fragment>
		)
	}
}

Control.propTypes = {
  data: PropTypes.shape({
	  name: PropTypes.string.isRequired,
	  env: PropTypes.string.isRequired,
	  light: PropTypes.string.isRequired,
	  status: PropTypes.string.isRequired,
	  type: PropTypes.string.isRequired,
	}).isRequired,
  color: PropTypes.string,
}

Control.defaultProps = {
  color: 'primary'
}
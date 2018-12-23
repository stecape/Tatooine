import React from 'react'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
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
	  this.toggle = () => {
			if (this.state.data.status=="1") {
				var value = "0"
			} else {
				var value = "1"
			}
			var cmd = "*1*" + value + "*" + this.state.data.env + this.state.data.light + "##"
			Meteor.call('SendOWNCommand', cmd)
		}

		return(

	    <React.Fragment>
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
	}).isRequired,
  color: PropTypes.string,
}

Control.defaultProps = {
  color: 'primary'
}
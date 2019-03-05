import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

class DetailSelectionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      detail: "highest"
    }
  }

	static getDerivedStateFromProps(nextProps, prevState){

		if (nextProps.detail != prevState.detail) {
			return {
				detail: nextProps.detail
			}
		}
		
		return null

	}

  render () {
    const { classes } = this.props

		this.handleSubmit = (event) => {
		  event.preventDefault()
		}

		this.Items = (props) => {
			return (
	      <div className={classes.root}>
	        <FormControl component="fieldset" className={classes.formControl}>
	          <FormLabel component="legend">{this.props.title}</FormLabel>
	          <RadioGroup
	            aria-label="detail"
	            name="detail2"
	            className={classes.group}
	            value={this.state.detail}
	            onChange={(e) => props.changeEvent({detail: e.target.value})}
	          >
	            <FormControlLabel
	              value="highest"
	              control={<Radio color="primary" />}
	              label="Highest"
	            />
	            <FormControlLabel
	              value="minutely"
	              control={<Radio color="primary" />}
	              label="Minutely"
	            />
	            <FormControlLabel
	              value="hourly"
	              control={<Radio color="primary" />}
	              label="Hourly"
	            />
	            <FormControlLabel
	              value="daily"
	              control={<Radio color="primary" />}
	              label="Daily"
	            />
	            <FormControlLabel
	              value="weekly"
	              control={<Radio color="primary" />}
	              label="Weekly"
	            />
	            <FormControlLabel
	              value="monthly"
	              control={<Radio color="primary" />}
	              label="Monthly"
	            />
	            <FormControlLabel
	              value="yearly"
	              control={<Radio color="primary" />}
	              label="Yearly"
	            />
						</RadioGroup>
          	<FormHelperText>densità di dati</FormHelperText>
					</FormControl>
				</div>
			)
		}

		var args = {
			detail: this.state.detail,
			changeEvent: (st) => this.props.changeEvent(st)
		}

  	return (
  	 <div>
  	 	{this.Items(args)}
  	 </div>
  	)
  }

}

DetailSelectionForm.defaultProps = {
	title: "Data Detail Level"
}

export default withStyles(styles)(DetailSelectionForm)
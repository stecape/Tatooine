import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

class TimeSelectionForm extends Component {
	
	state = {}
  

  componentDidMount() {
		this.setState ({ 
			detail: 				this.props.detail,
			width: 					this.props.width,
			unit: 					this.props.unit,
	    to: 						this.props.to,
	    from: 					this.props.from,
			selectedOption: this.props.selectedOption
		})
	}

  componentWillUnmount(){
    this.props.changeEvent(this.state)
  }

  render () {
    const { classes } = this.props

		this.handleChange = (event) => {
			var value = event.target.value
		  switch(value) {
		    case 'lastYear':
			    return({
			      width: 1,
			      unit: 60*60*24*365,
	          to: this.state.to,
	          from: new Date(this.state.to.getTime() - 1*60*60*24*365*1000),
			    	selectedOption: value
			    })
		    	break
		    case 'last6Months':
			    return({
			      width: 6,
			      unit: 60*60*24*30,
	          to: this.state.to,
	          from: new Date(this.state.to.getTime() - 6*60*60*24*30*1000),
			    	selectedOption: value
			    })
		    	break
		    case 'lastMonth':
			    return({
			      width: 1,
			      unit: 60*60*24*30,
	          to: this.state.to,
	          from: new Date(this.state.to.getTime() - 1*60*60*24*30*1000),
			    	selectedOption: value
			    })
		    	break
		    case 'lastWeek':
			    return({
			      width: 1,
			      unit: 60*60*24*7,
	          to: this.state.to,
	          from: new Date(this.state.to.getTime() - 1*60*60*24*7*1000),
			    	selectedOption: value
			    })
		    	break
		    case 'last24Hours':
			    return({
			      width: 1,
			      unit: 60*60*24,
	          to: this.state.to,
	          from: new Date(this.state.to.getTime() - 1*60*60*24*1000),
			    	selectedOption: value
			    })
		    	break
		    case 'Span':
			    return({
			      width: this.state.width,
			      unit: this.state.unit,
	          to: this.state.to,
	          from: new Date(this.state.to.getTime() - 1*60*60*24*1000),
			    	selectedOption: value
			    })
		   		break
		    case 'Period':
			    return({
			    	selectedOption: value
			    })
		   		break
		  }

		  if ( this.state.selectedOption == 'Span' && event.target.name == 'width' ) {
		  	return({
		      from: new Date(new Date(new Date().getTime() - event.target.value*this.state.unit*1000)),
		      to: new Date(),
		      width: event.target.value,
		      unit: this.state.unit,
		    })
		  }
		  if ( this.state.selectedOption == 'Span' && event.target.name == 'unit' ) {
		  	return({
		      from: new Date(new Date(new Date().getTime() - event.target.value*this.state.width*1000)),
		      to: new Date(),
		      width: this.state.width,
		      unit: event.target.value,
		    })
		  }
		  if ( this.state.selectedOption == 'Period' && event.target.name == 'from' ) {
		    return({
		      from: new Date(event.target.value),
		      to: this.state.to,
		    })
		  }
		  if ( this.state.selectedOption == 'Period' && event.target.name == 'to' ) {
		    return({
		      from: this.state.from,
		      to: new Date(event.target.value),
		      unit: event.target.value,
		    })
		  }
		}

		this.Items = () => {
			return (
    		<React.Fragment>
		      <Grid alignItems="center" direction="row" container spacing={24}>
	        	<Grid item md={12} sm={12} xs={12}>
		        	<FormControl component="fieldset" className={classes.formControl}>
			          <FormLabel component="legend">{this.props.titleTimes}</FormLabel>
						    <RadioGroup
			            aria-label="detail"
			            name="detail2"
			            className={classes.group}
			            value={this.state.selectedOption}
			            onChange={(e) =>{ this.setState(this.handleChange(e))
			            }}
			          >
			            <FormControlLabel
			              value="lastYear"
			              control={<Radio color="primary" />}
			              label="Last Year"
			            />
			            <FormControlLabel
			              value="last6Months"
			              control={<Radio color="primary" />}
			              label="Last 6 Months"
			            />
			            <FormControlLabel
			              value="lastMonth"
			              control={<Radio color="primary" />}
			              label="Last Month"
			            />
			            <FormControlLabel
			              value="lastWeek"
			              control={<Radio color="primary" />}
			              label="Last Week"
			            />
			            <FormControlLabel
			              value="last24Hours"
			              control={<Radio color="primary" />}
			              label="Last 24 Hours"
			            />
			            <FormControlLabel
			              value="Span"
			              control={<Radio color="primary" />}
			              label="Enter Span"
			            />
			            <FormControlLabel
			              value="Period"
			              control={<Radio color="primary" />}
			              label="Enter Period"
			            />
								</RadioGroup>
							</FormControl>
	        	</Grid>	
						{
					  	this.state.selectedOption == "Span" &&
    						<React.Fragment>
	    						<Grid item md={6} sm={6} xs={6}>
						        <FormControl className={classes.formControl}>
								  		<TextField
							          id="width"
							          name="width"
							          label="Width"
							          value={this.state.width}
							          onChange={(e) => this.setState(this.handleChange(e))}
							          type="number"
							          className={classes.textField}
							          InputLabelProps={{
							            shrink: true,
							          }}
							          margin="normal"
							        />
						        </FormControl>
	    						</Grid>	
	    						<Grid item md={6} sm={6} xs={6}>
						        <FormControl className={classes.formControl}>
						          <InputLabel htmlFor="unit">Unit</InputLabel>
						          <Select 
						          	value={this.state.unit}
						          	input={<Input name="unit" id="unit"/>}
						          	onChange={(e) => this.setState(this.handleChange(e))}
						          >
												<MenuItem value={1}>Seconds</MenuItem>
												<MenuItem value={60*1}>Minutes</MenuItem>
												<MenuItem value={60*60}>Hours</MenuItem>
												<MenuItem value={60*60*24}>Days</MenuItem>
												<MenuItem value={60*60*24*7}>Weeks</MenuItem>
												<MenuItem value={60*60*24*30}>Months</MenuItem>
												<MenuItem value={60*60*24*365}>Years</MenuItem>
						          </Select>
						        </FormControl>
	      					</Grid>
    						</React.Fragment>
					  }
    			</Grid>
				  {
				  	this.state.selectedOption == "Period" &&
							<React.Fragment>
    						<Grid item md={6} sm={6} xs={6}>
					        <FormControl className={classes.formControl}>
							  		<TextField
						          id="from"
						          name="from"
						          label="From"
						          value={new Date(this.state.from.getTime() - (this.state.from.getTimezoneOffset() * 60000)).toISOString().substr(0,19)}
						          onChange={(e) => this.setState(this.handleChange(e))}
						          type="datetime-local"
						          className={classes.textField}
						          InputLabelProps={{
						            shrink: true,
						          }}
						          margin="normal"
						        />
					        </FormControl>
    						</Grid>
    						<Grid item md={6} sm={6} xs={6}>
					        <FormControl className={classes.formControl}>
							  		<TextField
						          id="to"
						          name="to"
						          label="To"
						          value={new Date(this.state.to.getTime() - (this.state.to.getTimezoneOffset() * 60000)).toISOString().substr(0,19)}
						          onChange={(e) => this.setState(this.handleChange(e))}
						          type="datetime-local"
						          className={classes.textField}
						          InputLabelProps={{
						            shrink: true,
						          }}
						          margin="normal"
						        />
					        </FormControl>
    						</Grid>	
							</React.Fragment>
					}
					<Grid item md={6} sm={6} xs={6}>
		        <FormControl className={classes.formControl}>
			        <FormLabel component="legend">{this.props.titleDetails}</FormLabel>
		          <RadioGroup
		            aria-label="detail"
		            name="detail2"
		            className={classes.group}
		            value={this.state.detail}
		            onChange={(e) => this.setState({detail: e.target.value})}
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
					</Grid>	
    		</React.Fragment>
			)
		}


  	return (
  		<div>
	  		{this.Items()}
  		</div>
  	)
  }

}


TimeSelectionForm.defaultProps = {
	titleTimes: "Time Scaling",
	titleDetails: "Details"
}

export default withStyles(styles)(TimeSelectionForm)
import React, { Component } from 'react'

export default class TimeSelectionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }
	static getDerivedStateFromProps(nextProps, prevState){
	 	return nextProps  
  }

  render () {

		this.handleChange = (props, event) => {
			var value = event.target.value
		  switch(value) {
		    case 'lastYear':
			    return({
			      width: 1,
			      unit: 60*60*24*365,
			    	selectedOption: value
			    })
		    	break
		    case 'last6Months':
			    return({
			      width: 6,
			      unit: 60*60*24*30,
			    	selectedOption: value
			    })
		    	break
		    case 'lastMonth':
			    return({
			      width: 1,
			      unit: 60*60*24*30,
			    	selectedOption: value
			    })
		    	break
		    case 'lastWeek':
			    return({
			      width: 1,
			      unit: 60*60*24*7,
			    	selectedOption: value
			    })
		    	break
		    case 'last24Hours':
			    return({
			      width: 1,
			      unit: 60*60*24,
			    	selectedOption: value
			    })
		    	break
		    case 'Span':
			    return({
			    	selectedOption: value
			    })
		   		break
		    case 'Period':
			    return({
			    	selectedOption: value
			    })
		   		break
		  }

		  if ( props.selectedOption == 'Span' && event.target.name == 'width' ) {
		  	return({
		      width: event.target.value,
		    })
		  }
		  if ( props.selectedOption == 'Span' && event.target.name == 'unit' ) {
		  	return({
		      unit: event.target.value,
		    })
		  }
		  if ( props.selectedOption == 'Period' && event.target.name == 'from' ) {
		    return({
		      from: new Date(event.target.value),
		    })
		  }
		  if ( props.selectedOption == 'Period' && event.target.name == 'to' ) {
		    return({
		      to: new Date(event.target.value),
		    })
		  }
		}


		this.handleSubmit = (event) => {
		  event.preventDefault()
		}

		this.Items = (props) => {
			return (
				<form onSubmit={this.handleSubmit}>
				  <div>
				    <label>
				      <input type="radio" value="lastYear" 
								checked={this.props.selectedOption === 'lastYear'} 
								onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))} />
								Last Year
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="last6Months" 
								checked={this.props.selectedOption === 'last6Months'} 
								onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))} />
								Last 6 Months
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="lastMonth" 
								checked={this.props.selectedOption === 'lastMonth'} 
								onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))} />
								Last Month
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="lastWeek" 
								checked={this.props.selectedOption === 'lastWeek'} 
								onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))} />
								Last Week
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="last24Hours" 
								checked={this.props.selectedOption === 'last24Hours'} 
								onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))} />
								Last 24 Hours
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="Span" 
								checked={this.props.selectedOption === 'Span'} 
								onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))} />
								Enter Span
				    </label>
				  </div>
				  {
				  	this.props.selectedOption == "Span" &&
				  	<div>
				  		<div>
					      <label>
									Width
					        <input
					        	name="width" type="number"
					        	value={this.props.width}
										onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))}
									/>
					      </label>
					    </div>
					    <div>
					      <label>
									Unit
					        <select
					        	name="unit"
					        	value={this.props.unit}
										onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))}
									>
										<option value={1}>Seconds</option>
										<option value={60*1}>Minutes</option>
										<option value={60*60}>Hours</option>
										<option value={60*60*24}>Days</option>
										<option value={60*60*24*7}>Weeks</option>
										<option value={60*60*24*30}>Months</option>
										<option value={60*60*24*365}>Years</option>
									</select>
					      </label>
							</div>
						</div>
				  }
				  <div>
				    <label>
				      <input type="radio" value="Period" 
								checked={this.props.selectedOption === 'Period'} 
								onChange={(e) => this.props.changeEvent(this.handleChange(this.props, e))} />
								Enter Period
				    </label>
				  </div>
				  {
				  	this.props.selectedOption == "Period" &&
				  	<div>
					    <div>
					      <label>
									From
					        <input
					        	name="from" type="datetime-local"
					        	value={new Date(props.from.getTime() - (props.from.getTimezoneOffset() * 60000)).toISOString().substr(0,19)}
										onChange={(e) => props.changeEvent(this.handleChange(props, e))}
									/>
					      </label>
					    </div>
					    <div>
					      <label>
									To
					        <input 
					        	name="to" type="datetime-local"
					        	value={new Date(props.to.getTime() - (props.to.getTimezoneOffset() * 60000)).toISOString().substr(0,19)}
										onChange={(e) => props.changeEvent(this.handleChange(props, e))}
									/>
					      </label>
					    </div>
					  </div>
					}
				</form>
			)
		}

  	var args = {
			from: this.state.from,
			to: this.state.to,
			width: this.state.width,
			unit: this.state.unit,
			selectedOption: this.state.selectedOption,
			changeEvent: (st) => this.setState(st)  		
  	}

  	return (
  		<div>
  	 		<h5>{this.props.title}</h5>
	  		{this.Items(args)}
  		</div>
  	)
  }

}


TimeSelectionForm.defaultProps = {
	title: "Time Scaling"
}
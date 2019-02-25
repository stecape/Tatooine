import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Lights } from '../../api/OWNFrames'
import Control from '../components/Control'
import { withTracker } from 'meteor/react-meteor-data'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

class Controls extends React.Component {
	constructor(props){
		super(props)
		this.state = {
	    	lights1: this.props.lights1,
	    	lights2: this.props.lights2,
	    	lights3: this.props.lights3
		}
	}

//keep state.data update with the data props provided by the HOC
	static getDerivedStateFromProps(nextProps, prevState){
	  if (nextProps !== prevState) {
	    return {
	    	lights1: nextProps.lights1,
	    	lights2: nextProps.lights2,
	    	lights3: nextProps.lights3
	    }
	  }
	  return null
	}


  render() {
  	
  	const classes = this.props.classes

		this.door = {
		  name: "Apri porta",
		  env: "3",
		  light: "99",
		  status: "1",
		  type: "pulse",
		}
		
		return(
			<div>
	  		<Typography variant="h5" color="inherit">
	        Controls
	  		</Typography>
	  		<br />
	  		<Grid container spacing={24}>
	        <Grid item md={4} sm={12} xs={12}>
	          <Paper className={classes.root} elevation={1}>
	        		<Typography variant="h5" component="h3">
	        		  Bagno, scala e ingresso
	        		</Typography>
				        	{this.state.lights1.map(light => <Grid item xl={12} key={light.name}><Control data={light} /></Grid>)}
				      <FormControl>
				        <FormGroup>
	        			</FormGroup>
	      			</FormControl>
	      		</Paper>
	        </Grid>

	        <Grid item md={4} sm={12} xs={12}>
	          <Paper className={classes.root} elevation={1}>
	        		<Typography variant="h5" component="h3">
	        		  Cucina, sala e studio
	        		</Typography>
				      <FormControl>
				        <FormGroup>
				        	{this.state.lights2.map(light => <Grid item xl={12} key={light.name}><Control data={light} /></Grid>)}
	        			</FormGroup>
	      			</FormControl>
	      		</Paper>
	        </Grid>

	        <Grid item md={4} sm={12} xs={12}>
	          <Paper className={classes.root} elevation={1}>
	        		<Typography variant="h5" component="h3">
	        		  Luci esterne e cantina
	        		</Typography>
				      <FormControl>
				        <FormGroup>
				        	{this.state.lights3.map(light => <Grid item xl={12} key={light.name}><Control data={light} /></Grid>)}
				        	<Grid item xl={12} key="door"><Control data={this.door} override="*6*10*4001##"/></Grid>
	        			</FormGroup>
	      			</FormControl>
	      		</Paper>
	        </Grid>        
	      </Grid>
	  	</div>
		)
	}
}

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
}

Controls = withStyles(styles, {name: 'Controls'})(Controls)
export default withTracker((props) => {
  return {
		lights1: Lights.find({env: { $in: ["1", "01"]}}).fetch(),
		lights2: Lights.find({env: { $in: ["2", "02"]}}).fetch(),	
		lights3: Lights.find({env: { $in: ["3", "03"]}}).fetch()
	}
})(Controls)
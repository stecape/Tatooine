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


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

function Controls (props) {
  const { classes } = props
	
	return(
		<div>
  		<Typography variant="h5" color="inherit">
        Controls
  		</Typography>
  		<br />
  		<Grid container spacing={24}>
        <Grid item md={4} sm={12}>
          <Paper className={classes.root} elevation={1}>
        		<Typography variant="h5" component="h3">
        		  Cucina
        		</Typography>

			      <FormControl>
			        <FormGroup>
			          <FormControlLabel
			            control={
			              <Switch
			                checked={true}
			                onChange={() => console.log('Veletta lato nord')}
			                value="Veletta lato nord"
			                color="primary"
			              />
			            }
			            label="Veletta lato nord"
			          />
			          <FormControlLabel
			            control={
			              <Switch
			                checked={false}
			                onChange={() => console.log('Veletta lato est')}
      			          value="Veletta lato est"
      			          color="primary"
            			  />
            			}
            			label="Veletta lato est"
          			/>
			          <FormControlLabel
			            control={
			              <Switch
			                checked={false}
			                onChange={() => console.log('Sottopensili')}
			                value="Sottopensili"
			                color="primary"
			              />
			            }
			            label="Sottopensili"
			          />
        			</FormGroup>
      			</FormControl>
      		</Paper>
        </Grid>
        <Grid item md={4} sm={12}>
          <Paper className={classes.root} elevation={1}>
        		<Typography variant="h5" component="h3">
        		  Sala
        		</Typography>

			      <FormControl>
			        <FormGroup>
			          <FormControlLabel
			            control={
			              <Switch
			                checked={true}
			                onChange={() => console.log('Veletta lato nord')}
			                value="Veletta lato nord"
          						color="primary"
			              />
			            }
			            label="Veletta lato nord"
			          />
			          <FormControlLabel
			            control={
			              <Switch
			                checked={true}
			                onChange={() => console.log('Veletta lato sud')}
      			          value="Veletta lato sud"
      			          color="primary"
            			  />
            			}
            			label="Veletta lato sud"
          			/>
        			</FormGroup>
      			</FormControl>
      		</Paper>
        </Grid>
      </Grid>
  	</div>
	)
}

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Controls)
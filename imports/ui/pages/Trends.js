import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ChartComponent from '../components/ChartComponent/ChartComponent'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

class Trends extends React.Component {

  render () {

    const classes = this.props.classes

    return(
      <div>
      <Typography variant="h5" color="inherit">
        Trends
      </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item md={12} sm={12} xs={12}>
            <Paper className={classes.root} elevation={1}>
              <ChartComponent />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, {name: 'Trends'})(Trends)
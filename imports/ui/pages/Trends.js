import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withTracker } from 'meteor/react-meteor-data'
import { Settings } from '../../api/Settings'
import TimeSelectionForm from '../components/ChartComponent/TimeSelectionForm'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ChartComponent from '../components/ChartComponent/ChartComponent'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

class Trends extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openModal: false,
      detail: 'hourly',
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate()-1)),
      width: 1,
      unit: 60*60*24,
      selectedOption: 'last24Hours'
    }
  }

  //a timer update the actual moment time each 500ms. This is the timebase of the real time charting.
  componentDidMount() {
    this.setState({
      to: new Date(),
      from: new Date(new Date().getTime() - this.state.width*this.state.unit*1000)
    })
    this.timer = setInterval(() => {
      if (this.state.selectedOption != "Period") {
        this.setState({
          to: new Date(),
          from: new Date(new Date().getTime() - this.state.width*this.state.unit*1000)
        })
      }
    }, 30000)
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }

  handleOpen = () => {
    this.setState({ openModal: true })
  }

  render () {

    const classes = this.props.classes

    return(
      <div>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={this.state.openModal}
        onClose={this.handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">Settings</DialogTitle>
        <DialogContent>
          <TimeSelectionForm      
            from =           {this.state.from}
            to =             {this.state.to}
            width =          {this.state.width}
            unit =           {this.state.unit}
            selectedOption = {this.state.selectedOption}
            detail =         {this.state.detail}
            changeEvent =    {(st) => {this.setState(st)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h5" color="inherit">
        Trends
        <IconButton onClick={this.handleOpen} className={classes.button} aria-label="Settings">
          <SettingsIcon />
        </IconButton>
      </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item md={12} sm={12} xs={12}>
            <Paper className={classes.root} elevation={1}>
              <ChartComponent 
                room =   "Bagno"
                from =   {this.state.from}
                to =     {this.state.to}
                detail = {this.state.detail}
              />
            </Paper>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Paper className={classes.root} elevation={1}>
              <ChartComponent 
                room =   "Cucina"
                from =   {this.state.from}
                to =     {this.state.to}
                detail = {this.state.detail}
              />
            </Paper>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Paper className={classes.root} elevation={1}>
              <ChartComponent 
                room =   "Sala"
                from =   {this.state.from}
                to =     {this.state.to}
                detail = {this.state.detail}
              />
            </Paper>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Paper className={classes.root} elevation={1}>
              <ChartComponent 
                room =   "Studio"
                from =   {this.state.from}
                to =     {this.state.to}
                detail = {this.state.detail}
              />
            </Paper>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Paper className={classes.root} elevation={1}>
              <ChartComponent 
                room =   "Ingresso"
                from =   {this.state.from}
                to =     {this.state.to}
                detail = {this.state.detail}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

TrendsWithStyles = withStyles(styles, {name: 'Trends'})(Trends)

export default withTracker((props) => {
  return {
    settings: Settings.find({}).fetch()
  }
})(TrendsWithStyles)
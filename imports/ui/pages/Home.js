import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from "react-router-dom"
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withTracker } from 'meteor/react-meteor-data'


function HomeNotAuthorized () {
	return(
  	<span style={{ 
  		fontSize: '45px',
  		color: '#aaa',
  		fontWeight: 100,
		}}>
			Waiting for approval
		</span>
	)
}


const styles = {
  card: {
    minHeight: 350,
  },
  media: {
    height: 140,
  },
};

function HomeAuthorized (props) {
  const classes = props.classes

  return (
		<Grid container spacing={24}>
      <Grid item xl={2} lg={4} md={6} sm={12} xs={12}>
		  		<Card className={classes.card} onClick={() => props.history.push("/controls")}>
			      <CardActionArea>
			        <CardMedia
	          		className={classes.media}
			          image="/menuImg/Controls.jpg"
			          title="Controls"
			        />
			        <CardContent>
			          <Typography gutterBottom variant="h5" component="h2">
			            Controls
			          </Typography>
			          <Typography component="p">
			            Pagina di controllo delle luci e degli attuatori della casa
			          </Typography>
			        </CardContent>
			      </CardActionArea>
			    </Card>
			</Grid>
      <Grid item xl={2} lg={4} md={6} sm={12} xs={12}>
		  		<Card className={classes.card} onClick={() => props.history.push("/plants")}>
			      <CardActionArea>
			        <CardMedia
	          		className={classes.media}
			          image="/menuImg/Plants.jpg"
			          title="Plants"
			        />
			        <CardContent>
			          <Typography gutterBottom variant="h5" component="h2">
			            Plants
			          </Typography>
			          <Typography component="p">
			            Supervisione e controllo degli impianti di acqua luce e gas
			          </Typography>
			        </CardContent>
			      </CardActionArea>
			    </Card>
			</Grid>
      <Grid item xl={2} lg={4} md={6} sm={12} xs={12}>
		  		<Card className={classes.card} onClick={() => props.history.push("/trends")}>
			      <CardActionArea>
			        <CardMedia
	          		className={classes.media}
			          image="/menuImg/Trends.gif"
			          title="Trends"
			        />
			        <CardContent>
			          <Typography gutterBottom variant="h5" component="h2">
			            Trends
			          </Typography>
			          <Typography component="p">
			            Strumento di supervisione che permette di visualizzare su un grafico l'andamento delle variabili della casa
			          </Typography>
			        </CardContent>
			      </CardActionArea>
			    </Card>
			</Grid>
      <Grid item xl={2} lg={4} md={6} sm={12} xs={12}>
		  		<Card className={classes.card} onClick={() => props.history.push("/docs")}>
			      <CardActionArea>
			        <CardMedia
	          		className={classes.media}
			          image="/menuImg/Docs.jpg"
			          title="Docs"
			        />
			        <CardContent>
			          <Typography gutterBottom variant="h5" component="h2">
			            Docs
			          </Typography>
			          <Typography component="p">
			            Archivio della documentazione riguardante la casa: planimetrie, documenti, backup, foto...
			          </Typography>
			        </CardContent>
			      </CardActionArea>
			    </Card>
			</Grid>
      { Roles.userIsInRole(props.user, ['ras']) && (<Grid item xl={2} lg={4} md={6} sm={12} xs={12}>
		  		<Card className={classes.card} onClick={() => props.history.push("/admin")}>
			      <CardActionArea>
			        <CardMedia
	          		className={classes.media}
			          image="/menuImg/Admin.png"
			          title="Admin"
			        />
			        <CardContent>
			          <Typography gutterBottom variant="h5" component="h2">
			            Admin
			          </Typography>
			          <Typography component="p">
			            Pagina di gestione degli utenti, dedicata agli amministratori
			          </Typography>
			        </CardContent>
			      </CardActionArea>
			    </Card>
			</Grid> )}
		</Grid>
	)
}

HomeAuthorized.propTypes = {
  classes: PropTypes.object.isRequired,
}

const StyledHomeAuthorized = withStyles(styles)(withRouter(HomeAuthorized))


class Home extends React.Component {
  render () {

  	return(
  		<React.Fragment>
  			{this.props.authorized ? <StyledHomeAuthorized user={this.props.user}/> : <HomeNotAuthorized />}
  		</React.Fragment>
  	)
  }
}
export default withTracker((props) => {
  
  return {
    user: Meteor.user() ? Meteor.user() : {}
  }
})(Home)
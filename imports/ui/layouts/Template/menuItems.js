import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ControlsIcon from '@material-ui/icons/TouchApp'
import PlantsIcon from '@material-ui/icons/Whatshot'
import TrendsIcon from '@material-ui/icons/Timeline'
import DocsIcon from '@material-ui/icons/LibraryBooks'
import AdminIcon from '@material-ui/icons/SupervisorAccount'

import { withRouter, matchPath } from "react-router"

class Items extends React.Component {
  

  render(){
  
    this.isSelected = (path, exact) => {
      var x = matchPath(this.props.location.pathname, {path: path, exact: !!exact })
      return !!x
    }
    
    return (
      <div>
        <NavLink style={{ textDecoration: 'none' }} exact to ='/'>
          <ListItem button selected={this.isSelected("/", true)}>      
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} to ='/controls'>
          <ListItem button selected={this.isSelected("/controls")}>
            <ListItemIcon>
              <ControlsIcon />
            </ListItemIcon>
            <ListItemText primary="Controls" />
          </ListItem>
        </NavLink>
        <NavLink style={{ textDecoration: 'none'  }} to ='/plants'>
          <ListItem button selected={this.isSelected("/plants")}>
            <ListItemIcon>
              <PlantsIcon />
            </ListItemIcon>
            <ListItemText primary="Plants" />
          </ListItem>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} to ='/trends'>
          <ListItem button selected={this.isSelected("/trends")}>
            <ListItemIcon>
              <TrendsIcon />
            </ListItemIcon>
            <ListItemText primary="Trends" />
          </ListItem>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} to ='/docs'>
          <ListItem button selected={this.isSelected("/docs")}>
            <ListItemIcon>
             <DocsIcon />
            </ListItemIcon>
            <ListItemText primary="Docs" />
          </ListItem>
        </NavLink>
        { Roles.userIsInRole(this.props.user, ['ras']) && (
        <NavLink style={{ textDecoration: 'none' }} to ='/admin'>
          <ListItem button selected={this.isSelected("/admin")}>
            <ListItemIcon>
              <AdminIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        </NavLink> )}
      </div>
    )
  }
}
export default MenuItems = withRouter(Items)

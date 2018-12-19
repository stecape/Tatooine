import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ControlsIcon from '@material-ui/icons/TouchApp'
import PlantsIcon from '@material-ui/icons/Whatshot'
import TrendsIcon from '@material-ui/icons/Timeline'
import DocsIcon from '@material-ui/icons/LibraryBooks'
import AdminIcon from '@material-ui/icons/SupervisorAccount'

export const menuItems = (
  <div>
      <NavLink exact activeClassName='active' to ='/'>
    <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
    </ListItem>
      </NavLink>
      <NavLink activeClassName='active' to ='/controls'>
    <ListItem button>
        <ListItemIcon>
          <ControlsIcon />
        </ListItemIcon>
        <ListItemText primary="Controls" />
    </ListItem>
      </NavLink>
      <NavLink activeClassName='active' to ='/plants'>
    <ListItem button>
        <ListItemIcon>
          <PlantsIcon />
        </ListItemIcon>
        <ListItemText primary="Plants" />
    </ListItem>
      </NavLink>
      <NavLink activeClassName='active' to ='/trends'>
    <ListItem button>
        <ListItemIcon>
          <TrendsIcon />
        </ListItemIcon>
        <ListItemText primary="Trends" />
    </ListItem>
      </NavLink>
      <NavLink activeClassName='active' to ='/docs'>
    <ListItem button>
        <ListItemIcon>
          <DocsIcon />
        </ListItemIcon>
        <ListItemText primary="Docs" />
    </ListItem>
      </NavLink>
      <NavLink activeClassName='active' to ='/admin'>
    <ListItem button>
        <ListItemIcon>
          <AdminIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
    </ListItem>
      </NavLink>
  </div>
)
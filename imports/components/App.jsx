import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
			<BrowserRouter>
				<div>
					<Switch>
    				<Route exact path="/" render={() => {return <div>Home</div>}} />
    				<Route render={() => {return <div>404 - Page not found</div>}} />
					</Switch>
				</div>
			</BrowserRouter>
    )
  }
}

export default App;

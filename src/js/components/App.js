import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import {Router,Link,Route,IndexRoute,browserHistory} from "react-router"
//import {BrowserRouter as Router, Switch, Link,Route,IndexRoute} from 'react-router-dom'
import Home,{DisplayNotFound,NotFound} from "./Home"
import {Header} from "./Header"

class App extends Component {

	render() {
		return ( 
           <div>
		   <Header />
		   <Home />
           </div>
		)  
	}
}

ReactDOM.render(<App />,document.getElementById('container'))

export default App;
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// util components
import PrivateRoute from './components/PrivateRoute'
import ToastComponent from './components/ToastComponent'

// contexts
import LoginProvider from './contexts/LoginContext'
import ApiProvider from './contexts/ApiContext'

// screens
import HomeScreen from './screens/HomeScreen'
import AuthScreen from './screens/AuthScreen'
import JobsScreen from './screens/JobsScreen'
import CreateJobScreen from './screens/CreateJobScreen'
import PNFScreen from './screens/PNFScreen'

function App() {
  return (
  	<LoginProvider>
      <ApiProvider>
        <ToastComponent/>
  	 	  <Router>
  	 	  	<Switch>
  	 	  		<Route path='/' exact component={HomeScreen} />
            <Route path='/auth/:type' component={AuthScreen} />
            <PrivateRoute path='/jobs' role={0} exact component={JobsScreen} />
            <PrivateRoute path='/create-job' role={0} exact component={CreateJobScreen} />
  	 	  		<Route default component={PNFScreen} />
  	 	  	</Switch>
  	 	  </Router>
      </ApiProvider>
  	</LoginProvider>
  )
}

export default App;

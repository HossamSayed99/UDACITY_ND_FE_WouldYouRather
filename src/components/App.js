import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'

class App extends Component {
  render(){
      console.log('Current User', this.props.currentUser)
      return (
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <div className = "app-content">
              {this.props.currentUser ? (
                  <Switch>
                    <Route path = '/' exact component = {Dashboard}></Route>
                    <Route path = '/question/:id' exact component = {QuestionPage}></Route>
                    <Route path='/new' component={NewQuestion}></Route>
                  </Switch> 
              ) : (
                <Login/>
                )
              }
            </div>
          </div>
        </Router>
      );
  }
}

function mapStateToProps({users}){
  return {
    currentUser: users.currentUser
  }
}

export default connect(mapStateToProps)(App);

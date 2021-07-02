import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'

class App extends Component {
  render(){
      console.log('Current User', this.props.currentUser)
      return (
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <div className = "app-content" style = {{textAlign: "center"}}>
              {this.props.currentUser ? (
                  <Switch>
                    <Route path = '/' exact component = {Dashboard}></Route>
                    <Route path = '/question/:id' exact component = {Question}></Route>
                    <Route path='/new' component={NewQuestion}></Route>
                    <Route paht='/leaderboard' component= {Leaderboard}></Route>
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

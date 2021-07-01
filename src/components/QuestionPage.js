import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {getInitialUsers} from '../actions/shared'
import {setUser} from '../actions/users'
import {Card, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionPage extends Component {

    render(){
        return (
            <h1>{this.props.currentUser}</h1>
        )
    }
}

export default connect()(QuestionPage)
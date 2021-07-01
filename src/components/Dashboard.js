import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {getInitialUsers} from '../actions/shared'
import {setUser} from '../actions/users'
import {Card, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {

    
    render(){
        const questions = this.props.questions
        const users = this.props.users
        const currentUser = users.currentUser
        return (
                <div>
                    <h1> Dashboard </h1>
                        <ul>
                            {
                                this.props.questionsIds.map((q) => (<li key = {q}> {questions[q].timestamp}</li>))
                            }
                        </ul>
                </div>
        )
    }
}
function mapStateToProps({questions, users}){
    return {
        questionsIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp), 
        users,
        questions
    }
}
export default connect(mapStateToProps)(Dashboard)
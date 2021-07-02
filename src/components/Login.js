import React, {Component} from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { connect } from 'react-redux'
import {getInitialQuestions, getInitialUsers} from '../actions/shared'
import {setUser} from '../actions/users'
import {Card, Dropdown, DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class Login extends Component{
    componentDidMount(){
        this.props.dispatch(getInitialUsers())
        this.props.dispatch(getInitialQuestions())
    }
    handleChooseUser = (e) =>{
        console.log(e)
        this.props.dispatch(setUser(e))
        console.log(this.props)
    }
    render(){
        return (
            <div>
                <Router>
                    <Card className = "login-card">
                    <Card.Header as="h5" style = {{color: "white", background: "#1e1a8f"}}>Login</Card.Header>
                    <Card.Body style = {{alignSelf: "center"}}>
                        <Card.Title>Choose your account</Card.Title>
                        <Card.Text>
                        </Card.Text>
                        <DropdownButton
                        title="Choose User"
                        onSelect={this.handleChooseUser}
                        >
                                {this.props.users && ( 
                                        Object.keys(this.props.users).map((user) => 
                                            (
                                                user!== 'currentUser' && 
                                                <div className = "single-user" key = {this.props.users[user].id}>
                                                    <img className = "user-image" src = {this.props.users[user].avatarURL} alt = "profile"></img>
                                                    <Dropdown.Item className = "user-name" href="" eventKey = {user}>{user}</Dropdown.Item>
                                                </div>
                                            )
                                        ) 
                                    )
                                }
                        </DropdownButton>
                    </Card.Body>
                    </Card>
                </Router>
            </div>
        )
    }
}

function mapStateToProps ( {currentUser, questions, users} ) {
    return { 
        users, 
        questions, 
    }
  }

export default connect(mapStateToProps)(Login)

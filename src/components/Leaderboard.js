import React, {Component} from 'react'
import { Container, Col, Row, ListGroup } from 'react-bootstrap'
import {connect} from 'react-redux'

class Leaderboard extends Component{
    render(){
        const  allUsers=  Object.assign({}, this.props.users)
        delete allUsers.currentUser
        console.log(allUsers)
        const usersSorted = Object.keys(allUsers).sort((a, b) => (Object.keys(allUsers[b].answers).length + allUsers[b].questions.length) - (Object.keys(allUsers[a].answers).length + allUsers[a].questions.length))
        console.log(usersSorted)
        return (
            <div>
                {
                    usersSorted.map((user) =>{
                        return(
                            <Container className = "question-card" key = {user}>
                                <Row>
                                    <Col md = "auto">
                                        <img className = "user-image single-user" src = {this.props.users[user].avatarURL} alt="user"></img>
                                    </Col>
                                    <Col>
                                        <div className = "question-details">
                                            <h4 className = "author-name">{user}</h4>
                                            <ListGroup className = "question-options">
                                                <ListGroup.Item style = {{color: "red"}}>{`Number of questions asked: ${this.props.users[user].questions.length}`}</ListGroup.Item>
                                                <ListGroup.Item style = {{color: "black"}}>{`Number of questions answered: ${Object.keys(this.props.users[user].answers).length}`}</ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    })
                }


            </div>
            
        )
    }
}


function mapStateToProps({users, questions}){
    return {
        users, 
        questions
    }
}

export default connect(mapStateToProps)(Leaderboard)
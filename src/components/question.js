import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row, ListGroup, ButtonGroup, Button} from 'react-bootstrap';


import { Link, useParams, withRouter } from 'react-router-dom'

class Question extends Component {
    
    
    render(){
        const id = this.props.match.params.id.slice(3)
        const {users, questions} = this.props
        const currentUser = users.currentUser
        const thisQuestion = questions[id]
        const totalVotes = thisQuestion.optionOne.votes.length + thisQuestion.optionTwo.votes.length
        const optionOneVotes = thisQuestion.optionOne.votes.length 
        const optionTwoVotes = totalVotes - optionOneVotes
        console.log(thisQuestion)
        if(!thisQuestion){
            return <h1>404 Question not found</h1>
        }
        else{
            if (Object.keys(users[currentUser].answers).includes(id)){
                return (
                    <Container className = "question-card">
                        <Row>
                            <Col md = "auto">
                                <img className = "user-image single-user" src = {users[thisQuestion.author].avatarURL}></img>
                            </Col>
                            <Col>
                                <div className = "question-details">
                                    <h4 className = "author-name">{thisQuestion.author}</h4>
                                    <h4 className = "question-title">Would you rather?</h4>
                                    <ListGroup className = "question-options">
                                        <ListGroup.Item style = {{color: "red", background: "rgba(91, 163, 112, 0.2)"}}>
                                                {
                                                    `
                                                    You chose : 
                                                    ${users[currentUser].answers[id] === 'optionOne' ? thisQuestion.optionOne.text :  thisQuestion.optionTwo.text}
                                                    `
                                                }
                                                <br></br>
                                                {
                                                    `
                                                    score: ${
                                                        users[currentUser].answers[id] === 'optionOne' ? optionOneVotes : optionTwoVotes
                                                        }
                                                        out of ${totalVotes}
                                                    `
                                                }
                                        </ListGroup.Item>
                                        <ListGroup.Item style = {{color: "grey"}}>{
                                            `
                                                ${users[currentUser].answers[id] === 'optionOne' ? thisQuestion.optionTwo.text :  thisQuestion.optionOne.text}
                                            `
                                        }
                                            <br></br>
                                        {
                                            `
                                                score =  ${users[currentUser].answers[id] === 'optionOne' ? optionTwoVotes: optionOneVotes}
                                                out of ${
                                                    totalVotes
                                                }
                                            `
                                        }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )
            }
            else{
                return (
                    <h1>What?</h1>
                )
            }
        }
    }
}


function mapStateToProps({users, questions}){
    return {
        users, 
        questions
    }
}
export default connect(mapStateToProps)(Question)
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row, ListGroup, ButtonGroup, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {
    state = {
        unanswered: true
    }

    changeStatetoAnswered = () => {
        this.setState({
            unanswered: false
        })
    }
    changeStatetoUnanswered = () => {
        console.log('Hello')
        this.setState({
            unanswered: true
        })
    }
    render(){
        const users = this.props.users
        const questions = this.props.questions
        const currentUser = users.currentUser
        const answeredQuestions = Object.keys(users[currentUser].answers).sort((a, b) =>  questions[b].timestamp - questions[a].timestamp)
        const unAnsweredQuestions = this.props.questionsIds.filter((q) => ( !answeredQuestions.includes(q) ) )
        console.log(answeredQuestions);
        if(this.state.unanswered){
            return (
                <div>
                    <h1> Dashboard </h1>
                    <ButtonGroup aria-label="Basic example" className = "questions-type">
                        <Button variant="primary" onClick = {()=> this.changeStatetoUnanswered()}>Unanswered</Button>
                        <Button variant="secondary"  onClick = {() => this.changeStatetoAnswered()}>Answered</Button>
                    </ButtonGroup>
                        <ul>
                            {
                                unAnsweredQuestions.map( (q) => {
                                    return(
                                        <LinkContainer key = {q} to = {`question/id:${q}`}>
                                            <Container className = "question-card" key = {q}>
                                                <Row>
                                                    <Col md = "auto">
                                                        <img className = "user-image single-user" src = {users[questions[q].author].avatarURL}></img>
                                                    </Col>
                                                    <Col>
                                                        <div className = "question-details">
                                                            <h4 className = "author-name">{questions[q].author}</h4>
                                                            <h4 className = "question-title">Would you rather?</h4>
                                                            <ListGroup className = "question-options">
                                                                <ListGroup.Item style = {{color: "red"}}>{questions[q].optionOne.text}</ListGroup.Item>
                                                                <ListGroup.Item style = {{color: "black"}}>{questions[q].optionTwo.text}</ListGroup.Item>
                                                            </ListGroup>
                                                            <LinkContainer style={{marginBottom: "5px"}} to = {`question/id:${q}`}>
                                                                <Button  variant = "primary">Answer question</Button>
                                                            </LinkContainer>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </LinkContainer>
                                    )
                                })
                            }
                        </ul>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h1> Dashboard </h1>
                    <ButtonGroup aria-label="Basic example" className = "questions-type">
                        <Button variant="primary" onClick = {()=> this.changeStatetoUnanswered()}>Unanswered</Button>
                        <Button variant="secondary"  onClick = {() => this.changeStatetoAnswered()}>Answered</Button>
                    </ButtonGroup>
                        <ul>
                            {
                                answeredQuestions.map( (q) => {
                                    return(
                                        <LinkContainer key = {q} to = {`question/id:${q}`}>
                                            <Container className = "question-card">
                                                <Row>
                                                    <Col md = "auto">
                                                        <img className = "user-image single-user" src = {users[questions[q].author].avatarURL}></img>
                                                    </Col>
                                                    <Col>
                                                        <div className = "question-details">
                                                            <h4 className = "author-name">{questions[q].author}</h4>
                                                            <h4 className = "question-title">Would you rather?</h4>
                                                            <ListGroup className = "question-options">
                                                                <ListGroup.Item style = {{color: "red", background: "rgba(91, 163, 112, 0.2)"}}>{
                                                                    users[currentUser].answers[q] === 'optionOne' ? questions[q].optionOne.text :  questions[q].optionTwo.text 
                                                                }
                                                                </ListGroup.Item>
                                                                <ListGroup.Item style = {{color: "grey"}}>{
                                                                    users[currentUser].answers[q] === 'optionOne' ? questions[q].optionTwo.text :  questions[q].optionOne.text 
                                                                }
                                                                </ListGroup.Item>
                                                            </ListGroup>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </LinkContainer>
                                    )
                                })
                            }
                        </ul>
                </div>
            )
        }
        
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row, ListGroup, Form, Button, ProgressBar} from 'react-bootstrap';
import { handleAnswerQuestion } from '../actions/questions';
import { addAnswer } from '../actions/users'
import { Link } from 'react-router-dom'
class Question extends Component {

    state = {
        selectedOption: null,
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        console.log(this.state.selectedOption)
        const details = {
            authedUser: this.props.users.currentUser,
            qid: this.props.match.params.id.slice(3),
            answer: this.state.selectedOption
        }
        this.props.dispatch(handleAnswerQuestion(details))
        this.props.dispatch(addAnswer(details))
    }
    handleChange = (e) =>{
        console.log(e.target.id)
        if(e.target.id === 1){
            this.setState({
                selectedOption: "optionOne"
            })
        }
        else{
            this.setState({
                selectedOption: "optionTwo"
            })
        }
    }
    
    render(){
        const id = this.props.match.params.id.slice(3)
        const {users, questions} = this.props
        const currentUser = users.currentUser
        const thisQuestion = questions[id]
        const totalVotes = thisQuestion ? thisQuestion.optionOne.votes.length + thisQuestion.optionTwo.votes.length: -1
        const optionOneVotes = thisQuestion ? thisQuestion.optionOne.votes.length : -1
        const optionTwoVotes = totalVotes - optionOneVotes
        const optionOnePercentage = Math.round(optionOneVotes * 100 / totalVotes)
        const optionTwoPercentage = 100 - optionOnePercentage
        console.log(thisQuestion)
        if(!thisQuestion){
            return (
                <div>
                    <img src = {'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png'} style = {{height: "auto", width: "50%", margin: "5px"}}/> 
                    <Link to='/' 
                    style ={{display:"block", marginTop:"5px", borderRadius: "5px", background: "skyblue",
                            padding: "5px", width:"fit-content", margin:"auto" , color:"white"}}>
                         Take me home
                    </Link>
                </div>
            )
        }
        else{
            if (Object.keys(users[currentUser].answers).includes(id)){
                return (
                    <Container className = "question-card">
                        <Row>
                            <Col md = "auto">
                                <img className = "user-image single-user" src = {users[thisQuestion.author].avatarURL} alt="avatar"></img>
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
                                                <ProgressBar now = {users[currentUser].answers[id] === 'optionOne' ? optionOnePercentage: optionTwoPercentage }
                                                    label ={`${users[currentUser].answers[id] === 'optionOne' ? optionOnePercentage: optionTwoPercentage}%` }/>
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
                                            <ProgressBar now = {users[currentUser].answers[id] === 'optionOne' ? optionTwoPercentage: optionOnePercentage } 
                                                label ={`${users[currentUser].answers[id] === 'optionOne' ? optionTwoPercentage: optionOnePercentage}%` }/>
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
                    <Container className = "question-card">
                        <Row>
                            <Col md = "auto">
                                <img className = "user-image single-user" src = {users[thisQuestion.author].avatarURL} alt="avatar"></img>
                            </Col>
                            <Col>
                                <div className = "question-details">
                                    <h4 className = "author-name">{thisQuestion.author}</h4>
                                    <h4 className = "question-title">Would you rather?</h4>
                                    <Form style = {{margin: "10px", textAlign: "left", fontSize:"20px"}} onSubmit = {(e) => this.handleSubmit(e)}>
                                        <Form.Check type= "radio" id = "1" name = "answers" label = {thisQuestion.optionOne.text} onChange = {this.handleChange}></Form.Check>
                                        <Form.Check type= "radio" id = "2" name = "answers" label = {thisQuestion.optionTwo.text} onChange = {this.handleChange}></Form.Check>
                                        {this.state.selectedOption === null ? (<Button variant="primary" type="submit" disabled> Submit Answer</Button>) : 
                                                                              (<Button variant="primary" type="submit"> Submit Answer</Button>)
                                        }
                                        
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
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
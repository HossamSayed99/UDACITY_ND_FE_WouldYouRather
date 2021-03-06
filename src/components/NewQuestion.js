import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'


class NewQuestion extends Component{
    state = {
        optionOne: '',
        optionTwo: '',  
    }
    handleAddFirstOption = (e) =>{
        const text = e.target.value
        this.setState(() =>({
            optionOne: text
        }))
    }
    handleAddSecondOption = (e) =>{
        const text = e.target.value
        this.setState(() => ({
            optionTwo: text
        }))
    }
    handleSubmit  = (e) =>{
        e.preventDefault()
        console.log('State: ',this.state)
        console.log('Props: ', this.props)
        const {optionOne, optionTwo} = this.state
        this.props.dispatch(handleAddQuestion(optionOne, optionTwo, this.props.users.currentUser))
        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
        }))
        this.props.history.push('/')
    }
    render(){
        const {optionOne, optionTwo}  = this.state

        return (
            <div>
                <h3 className='center'>Create New Question</h3>
                <div className = 'image-container'>
                    <img className = 'center question-image'src = {'https://icebreakerideas.com/wp-content/uploads/2019/04/Would-You-Rather-Questions-e1603506571355.jpg'} alt="gameicon"></img>
                </div>
                <form className='new-question' onSubmit={this.handleSubmit}>
                <textarea
                    placeholder="First Option"
                    value={optionOne}
                    onChange = {this.handleAddFirstOption}
                    className='textarea'
                    maxLength={280}
                />
                <h4> OR </h4>
                <textarea
                    placeholder="Second Option"
                    value={optionTwo}
                    onChange = {this.handleAddSecondOption}
                    className='textarea'
                    maxLength={280}
                />
                <button
                    className='btn'
                    variant = "primary"
                    type='submit'
                    disabled= {optionOne === '' || optionTwo === ''}>
                    Submit
                </button>
                </form>
            </div>
        )
    }
}


function mapStateToProps ( {users} ) {
    return {
        users
    }
  }
export default connect(mapStateToProps)(NewQuestion)
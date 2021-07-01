import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'
import {Redirect} from 'react-router-dom'


class NewQuestion extends Component{
    state = {
        optionOne: '',
        optionTwo: '',  
        finished: false
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
        // const {optionOne, optionTwo} = this.state
        // this.props.dispatch(handleAddQuestion(optionOne, optionTwo))
        // this.setState(() => ({
        //     optionOne: '',
        //     optionTwo: '',
        //     finished: true
        // }))
    }
    render(){
        const {optionOne, optionTwo, finished}  = this.state
        if(finished === true){
            return <Redirect to = '/unanswered'></Redirect>
        }

        return (
            <div>
                <h3 className='center'>Create New Question</h3>
                <div className = 'image-container'>
                    <img className = 'center question-image'src = {'https://icebreakerideas.com/wp-content/uploads/2019/04/Would-You-Rather-Questions-e1603506571355.jpg'}></img>
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
                    type='submit'
                    disabled={optionOne === '' || optionTwo === ''}>
                    Submit
                </button>
                </form>
            </div>
        )
    }
}


function mapStateToProps ( users ) {
    return {
        users
    }
  }
export default connect(mapStateToProps)(NewQuestion)
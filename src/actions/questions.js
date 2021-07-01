import {_saveQuestion, _saveQuestionAnswer} from '../utils/_DATA'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'


function addQuestion (question){
    return {
        type: ADD_QUESTION, 
        question
    }
}

export function handleAddQuestion(optionOne, optionTwo){
    return (dispatch, getState) => {
        const { currentUser } = getState()
        return _saveQuestion({
            optionOne, 
            optionTwo, 
            currentUser
        })
            .then((question) => dispatch(addQuestion(question)))
    }
}

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS, 
        questions
    }
}

function answerQuestion({ authedUser,id, answer}){
    return {
        type: ANSWER_QUESTION,
        id, 
        authedUser, 
        answer
    }
}

export function handleAnswerQuestion(details){
    return (dispatch) =>{
        dispatch(answerQuestion(details))
        return _saveQuestionAnswer(details)
                .catch((e) => {
                    console.warn(e)
                    alert("Erros in saving the answer, please try again")
                })
    }
}


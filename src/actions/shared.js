import {_getQuestions, _getUsers} from '../utils/_DATA'
import { receiveQuestions } from './questions'
import {receiveUsers} from './users'


export function getInitialUsers(){
    return (dispatch) =>{
        return _getUsers()
            .then( (users)  => {
                dispatch(receiveUsers(users))
            })
    }
}

export function getInitialQuestions(){
    return (dispatch) =>{
        return _getQuestions()
            .then((questions) => {
                dispatch(receiveQuestions(questions))
            })
    }
}
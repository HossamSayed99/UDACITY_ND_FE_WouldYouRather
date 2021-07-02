import { RECEIVE_USERS, SET_USER, REMOVE_USER, ADD_ANSWER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case SET_USER:
      return {
        ...state, 
        currentUser: action.user
      }
    case REMOVE_USER:
      let newState = state
      if(newState.currentUser)
        delete newState.currentUser
      return {
        ...newState,
      }
    case ADD_ANSWER:
      return {
        ...state,
        [action.authedUser]:{
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    default :
      return state
  }
}
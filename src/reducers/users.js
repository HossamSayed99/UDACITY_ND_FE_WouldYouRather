import { RECEIVE_USERS, SET_USER, REMOVE_USER } from '../actions/users'

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
    default :
      return state
  }
}
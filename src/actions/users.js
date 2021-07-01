export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function setUser(user){
  return{
    type : SET_USER, 
    user
  }
}

export function removeUser(){
  return{
    type : REMOVE_USER, 
  }
}
// A logger middle ware that reports on actions once it is dispatched
const logger = (store) => (next) => (action) => {
    console.group(action.type)
      console.log('The action: ', action)
      const returnValue = next(action)
      console.log('The new state: ', store.getState())
    console.groupEnd()
    return returnValue
  }
  
  export default logger
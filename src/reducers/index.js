import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import toDoReducer from './todo-reducer'
import authReducer from './auth-reducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  toDo: toDoReducer,
  auth: authReducer,
})

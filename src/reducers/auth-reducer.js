import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
} from '../actions/action-types'

const initialState = {
  isAdmin: false,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADMIN_LOGIN:
      return {
        isAdmin: true,
      }
    case ADMIN_LOGOUT:
      return {
        isAdmin: false,
      }
    default:
      return state
  }
}



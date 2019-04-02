import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
} from './action-types'

export const logout = () => (dispatch) => {
  dispatch({
    type: ADMIN_LOGOUT,
  })
}

export const login = () => (dispatch) => {
  dispatch({
    type: ADMIN_LOGIN,
  })
}

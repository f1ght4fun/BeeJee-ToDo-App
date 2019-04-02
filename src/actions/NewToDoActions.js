import {
  TODO_ADD_LOADING,
  TODO_ADD_ERROR,
} from './action-types'
import axios from 'axios'
import {push} from 'connected-react-router'

export const addNewToDo = (toDo) => {
  return (dispatch, getState, api) => {
    dispatch({
      type: TODO_ADD_LOADING,
    })

    let formData = new FormData()
    Object.keys(toDo).map(key => {
      formData.append(key, toDo[key])
    })

    axios({
      url: `${api}/create?developer=pcoselev`,
      method: 'POST',
      crossDomain: true,
      data: formData,
      config: {headers: {'Content-Type': 'multipart/form-data'}},
    }).then((response) => {
      dispatch(push('/list'))
    }).catch((response) => {
      dispatch({
        type: TODO_ADD_ERROR,
        payload: response.error,
      })
    })
  }
}



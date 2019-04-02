import {
  TODO_FETCH_LOADING,
  TODO_FETCH_ERROR,
  TODO_FETCH_SUCCESS,

  TODO_SORT,
  TODO_PAGE,

  TODO_EDIT_LOADING,
  TODO_EDIT_ERROR,
  TODO_EDIT_SUCCESS,
} from './action-types'
import axios from 'axios'
import md5 from 'md5'

export const addNew = (page) => (dispatch) => {
  dispatch({
    type: TODO_PAGE,
    payload: page,
  })
}

export const pageChanged = (page) => (dispatch) => {
  dispatch({
    type: TODO_PAGE,
    payload: page,
  })
}

export const sortChanged = (sort) => (dispatch) => {
  dispatch({
    type: TODO_SORT,
    payload: sort,
  })
}

const _prepareEditFormData = (task) => {
  let params = [
    {field: 'token', value: 'beejee'},
    {field: 'text', value: encodeURIComponent(task.text)},
    {field: 'status', value: encodeURIComponent(task.status)},
  ]

  params.sort((a, b) => {return a.field < b.field ? -1 : (a.field > b.field ? 1 : 0)})

  params.push({
    field: 'signature',
    value: md5(params.map(item => `${item.field}=${item.value}`).join('&')),
  })

  params.sort((a, b) => {return a.field < b.field ? -1 : (a.field > b.field ? 1 : 0)})

  let formData = new FormData()
  params.map(item => {
    formData.append(item.field, item.value)
  })

  return formData
}

export const taskChanged = (task) => {
  return async(dispatch, getState, api) => {


    dispatch({
      type: TODO_EDIT_LOADING,
    })

    const formData = _prepareEditFormData(task)

    const response = await axios({
      url: `${api}/edit/${task.id}/?developer=pcoselev`,
      method: 'POST',
      crossDomain: true,
      data: formData,
      config: {headers: {'Content-Type': 'multipart/form-data'}},
    })


    if (response.data.status === 'ok') {
      dispatch({
        type: TODO_EDIT_SUCCESS,
        payload: task,
      })
    } else {
      dispatch({
        type: TODO_EDIT_ERROR,
        payload: response.data.message,
      })
    }
  }
}

export const fetch = () => {
  return async(dispatch, getState, api) => {

    dispatch({
      type: TODO_FETCH_LOADING,
    })

    let {paging, sorting} = getState().toDo.list

    const response = await axios({
      url: `${api}`,
      method: 'get',
      params: {
        developer: 'pcoselev',
        ...paging,
        ...sorting,
      },
    })

    dispatch({
      type: response.data.status === 'ok' ? TODO_FETCH_SUCCESS : TODO_FETCH_ERROR,
      payload: response.data.message,
    })
  }
}



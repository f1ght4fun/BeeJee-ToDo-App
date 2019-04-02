import {
  TODO_ADD_LOADING,
  TODO_ADD_ERROR,
  TODO_FETCH_LOADING,
  TODO_FETCH_ERROR,
  TODO_FETCH_SUCCESS,
  TODO_PAGE,
  TODO_SORT,
} from '../actions/action-types'

const initialState = {
  loading: false,
  err: null,
  list: {
    paging: {
      page: 1,
    },
    sorting: {
      sort_field: 'username',
      sort_direction: 'desc',
    },
    tasks: [],
    total_task_count: 0,
  },
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case TODO_ADD_LOADING:
    case TODO_FETCH_LOADING:
      return {
        ...state,
        loading: true,
        err: null,
      }
    case TODO_ADD_ERROR:
    case TODO_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        err: payload,
      }
    case TODO_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: {
          ...state.list,
          ...payload,
        },
      }
    case TODO_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          paging: {
            page: payload,
          },
        },
      }
    case TODO_SORT:
      return {
        ...state,
        list: {
          ...state.list,
          sorting: payload,
        },
      }
    default:
      return state
  }
}


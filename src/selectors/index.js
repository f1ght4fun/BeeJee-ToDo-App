
export const getNewItemState = (state) => {
  return {
    loading: state.loading,
    err: state.err,
  }
}

export const getToDoState = (state) => {
  return {
    ...state.toDo,
    ...state.auth,
  }
}

import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

import * as ListToDoActions from '../../../actions/ListToDoActions'
import {getToDoState} from '../../../selectors'

import {ToDoList} from '../Components/ToDoList'
import Pagination from '../../Pagination/Pagination'

export class ToDoHOC extends Component {

  componentDidMount() {
    this.props.fetch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list.paging.page !== this.props.list.paging.page ||
        prevProps.list.sorting.sort_field !== this.props.list.sorting.sort_field ||
        prevProps.list.sorting.sort_direction !== this.props.list.sorting.sort_direction) {
      this.props.fetch()
    }
  }

  render() {
    const {paging, sorting, tasks, total_task_count: totalCount} = this.props.list

    return (
      <div className="to-do to-do-center transparent-bg">
        <ToDoList sorting={sorting} tasks={tasks} editable={this.props.isAdmin} />
        <Pagination totalCount={parseInt(totalCount, 10)} pageSize={3} page={paging.page} onChangePage={this.props.pageChanged}/>
        <Button className="btn btn-dark w-10 self-end" onClick={() => this.props.history.push('/add')}>Add</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return getToDoState(state)
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...ListToDoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToDoHOC))

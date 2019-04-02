import React from 'react'
import {connect} from 'react-redux'

import {Table, Button} from 'reactstrap'
import {Form, Field} from 'react-final-form'
import TextFieldAdapter from '../../TextFieldAdapter'

import {sortChanged, taskChanged} from '../../../actions/ListToDoActions'

export const ToDoList = (props) => {
  const columns = [
    {field: 'username', name: 'Username', visible: true, editable: false, sortable: true},
    {field: 'email', name: 'Email', visible: true, editable: false, sortable: true},
    {field: 'text', name: 'Task', visible: true, editable: props.editable, sortable: false},
    {field: 'status', mapField: 'statusDescr', name: 'Status', visible: true, editable: false, sortable: true},
    {field: 'actions', name: 'Actions', visible: props.editable, editable: false, sortable: true},
  ]
  const statusMap = {
    0: 'To Do',
    10: 'Done',
  }

  const visibleColumns = columns.filter(col => col.visible)
  const todolist = props.tasks.map(t => {
    return {...t, statusDescr: statusMap[t.status]}
  })

  return (
    <Table dark>
      <ToDoHeader sorting={props.sorting} cols={visibleColumns} />
      <ToDoBody tasks={todolist} cols={visibleColumns} />
    </Table>
  )
}

const Header = (props) => {
  const onHeaderClick = (field, direction) => {

    if (direction) {
      props.onSortChanged({
        sort_field: field,
        sort_direction: direction === 'asc' ? 'desc' : 'asc',
      })
    } else {
      props.onSortChanged({
        sort_field: field,
        sort_direction: 'asc',
      })
    }
  }

  const SortableHeaderColumn = (props) => {
    const sortMap = {
      asc: 'fa fa-arrow-up',
      desc: 'fa fa-arrow-down',
    }
    return (
      <th onClick={() => props.headerClick(props.col.field, props.direction)}>
        {props.col.name} <i className={sortMap[props.direction]}></i>
      </th>
    )
  }

  const SimpleHeaderColumn = (props) => {
    return (
      <th>
        {props.col.name}
      </th>
    )
  }

  return (
    <thead>
      <tr>
        {
          props.cols.map((col, idx) => {
            if (col.sortable) {
              const direction = col.field === props.sorting.sort_field ? props.sorting.sort_direction : null
              return <SortableHeaderColumn key={idx} col={col} direction={direction} headerClick={onHeaderClick} />
            } else {
              return <SimpleHeaderColumn key={idx} col={col} />
            }
          })
        }
      </tr>
    </thead>
  )
}
const mapDispatchToHeaderProps = dispatch => {
  return {
    onSortChanged: (sort) => {dispatch(sortChanged(sort))},
  }
}
const ToDoHeader = connect(null, mapDispatchToHeaderProps)(Header)

const Body = (props) => {

  const SimpleCell = (props) => {
    return (
      <td>
        {props.task[props.col.mapField] || props.task[props.col.field]}
      </td>
    )
  }

  const EditableCell = (props) => {
    return (
      <td>
        <Form
          onSubmit={async values => {
            const {task} = values

            props.onEdit({...props.task, text: task})
          }}
          initialValues={{task: props.task[props.col.field]}}
          render={({handleSubmit, reset, submitting, validating, pristine, values}) => (
            <form onSubmit={handleSubmit} className="flex flex-row">
              <Field
                name="task"
                id="task"
                required
                value={props.task[props.col.field]}
                component={TextFieldAdapter}
              />
              <Button type="submit" color="primary"> Save</Button>
            </form>
          )}
        />
      </td>
    )
  }

  const MarkAction = (props) => {
    const onChecked = () => {

      props.onEdit({...props.task, status: props.task.status === 0 ? 10 : 0})
    }

    return (
      <label className="switch switch-label switch-pill switch-success">
        <input type="checkbox" className="switch-input" checked={props.task.status === 10} onChange={onChecked} />
        <span className="switch-slider" data-checked="&#x2713;" data-unchecked="&#x2715;"></span>
      </label>
    )
  }

  return (
    <tbody>
      {
        props.tasks.map((task) => {
          return (
            <tr key={task.id} className={task.status === 10 ? 'bg-success' : ''}>
              {
                props.cols.map((col, key) => {
                  if (task.hasOwnProperty(col.field)) {
                    return col.editable ?
                      <EditableCell key={key} task={task} col={col} onEdit={props.onEdit} /> :
                      <SimpleCell key={key} task={task} col={col} />
                  } else {
                    return (
                      <td key={key}>
                        <MarkAction task={task} onEdit={props.onEdit} />
                      </td>
                    )
                  }
                })
              }
            </tr>
          )
        })
      }
    </tbody>
  )
}


const mapDispatchToBodyProps = dispatch => {
  return {
    onEdit: (task) => {dispatch(taskChanged(task))},
  }
}
const ToDoBody = connect(null, mapDispatchToBodyProps)(Body)

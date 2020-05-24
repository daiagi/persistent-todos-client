import React, { useEffect, useState } from 'react';
import { useAuth } from '../authHandler';
import TodoCard from '../todoCard';
import { readAllTodos, deleteTodo, updateTodo } from '../api/todosApi';
import { Container, Tooltip, Fab, Drawer, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
const addUiProps = (todo) => ({
  ui: {
    loading: {
      delete: false,
      edit: false,
      done: false
    }
  },
  ...todo
})

const arrayToIdRecord = (array) => array.reduce((record, value) => ({ ...record, [value._id]: addUiProps(value) }), {});

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));


const App = () => {
  const classes = useStyles();
  const { getToken } = useAuth()
  const [todos, setTodos] = useState({})
  const [drawerOpen, setDrawerOpen] = useState(false);
  const setTodo = (todoId, newState) => {
    const newTodo = { ...todos[todoId], ...newState };
    setTodos({ ...todos, [todoId]: newTodo })
  }

  const deleteTodoAction = (todoId) => {
    const todo = { ...todos[todoId] };
    todo.ui.loading.delete = true;
    setTodo(todoId, todo)
    deleteTodo(todoId).then(() => {
      const newTodos = { ...todos };
      delete newTodos[todoId]
      setTodos(newTodos)
    }).catch(() => {
      todo.ui.loading.delete = false;
      setTodo(todoId, todo)
    })
  }
  const onEditAction = (todoId, body) => {
    const todo = { ...todos[todoId] };
    todo.ui.loading.edit = true;
    setTodo(todoId, todo)
    updateTodo(todoId, body).then(() => {
      todo.ui.loading.edit = false;
      setTodo(todoId, todo)
      setTodo(todoId, body);
    }).catch(() => {
      todo.ui.loading.done = false;
      setTodo(todoId, todo)
    })
  }

  const todoDoneAction = (todoId) => {
    const todo = { ...todos[todoId] };
    todo.ui.loading.done = true;
    setTodo(todoId, todo)
    updateTodo(todoId, { done: true }).then(() => {
      todo.ui.loading.done = false;
      todo.done = true;
      setTodo(todoId, todo)
    }).catch(() => {
      todo.ui.loading.done = false;
      setTodo(todoId, todo)
    })
  }

  useEffect(() => {
    readAllTodos().then(todos => {
      const todosRecord = arrayToIdRecord(todos);
      setTodos(todosRecord)
    })
  }, [])

  return (
    <Container>
      <div>
        {Object.values(todos).map((toto) => (<TodoCard
          todo={toto}
          onDelete={deleteTodoAction}
          onDone={todoDoneAction}
          onEdit={onEditAction}
          key={toto.title} />))}
      </div>
      <Tooltip title="Add" aria-label="add">
        <Fab onClick={() => setDrawerOpen(true)} color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Paper>
          {Object.values(todos).map((toto) => (<TodoCard
            todo={toto}
            onDelete={deleteTodoAction}
            onDone={todoDoneAction}
            onEdit={onEditAction}
            key={toto.title} />))}
        </Paper>

      </Drawer>
    </Container>
  )

}

export default App;

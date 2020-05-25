import { Container, Fab, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { deleteTodo, readAllTodos, updateTodo, createTodo, readTodo } from '../api/todosApi';
import TodoCard from '../todoCard';
import CreateTodoDialog from '../createTodoDialog';
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
  let history = useHistory();
  const [todos, setTodos] = useState({})
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
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
  const createNewTodo = (body) => {
    createTodo(body)
      .then(({ todoId }) => readTodo(todoId))
      .then((newTodo) => {
        setTodos((todos) => ({ ...todos, [newTodo._id]: addUiProps(newTodo) }))
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
    readAllTodos(() => history.push('/login'))
      .then(todos => {
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
        <Fab onClick={() => setCreateDialogOpen(true)} color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <CreateTodoDialog open={createDialogOpen} create={createNewTodo} onClose={() => setCreateDialogOpen(false)} />
    </Container>
  )

}

export default App;

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import React from 'react';



const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    display: 'inline-block',
    margin: theme.spacing(2)
  },
  done: {
    borderColor: theme.palette.warning.main
  },
  editable: {
    outline: "none"
  },
  date: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

}));
const progressIcon = (color) => <CircularProgress color={color || "inherit"} size={16} />


export default function TodoCard({ todo, onDelete, onEdit, onDone }) {
  const classes = useStyles();
  const { title, content, done, updated, _id: id } = todo
  const onFieldBlur = (id, fieldName) => (event) => onEdit(id, { [fieldName]: event.currentTarget.innerText })


  return (
    <Card className={clsx(classes.root, { [classes.done]: done })} variant="outlined">
      <CardContent>
        <Typography onBlur={onFieldBlur(id, 'title')} className={classes.editable} variant="h5" component="h3" color="textPrimary" contentEditable="true" gutterBottom>
          {title}
        </Typography>
        <Typography className={clsx(classes.date, classes.editable)}>
          {updated}
        </Typography>

        <Typography variant="body2" onBlur={onFieldBlur(id, 'content')} className={classes.editable} component="div" contentEditable="true">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={clsx({ [classes.done]: done })}
          onClick={() => onDone(id)}
          startIcon={todo.ui.loading.done ? progressIcon() : <DoneIcon />}
        >
          Done
          </Button>
        <Button
          variant="outlined"
          size="small"
          // onClick={() => onDone(id)}
          startIcon={todo.ui.loading.edit ? progressIcon() : <DoneIcon />}
        >Edit</Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={todo.ui.loading.delete ? progressIcon() : <DeleteIcon />}
          onClick={() => onDelete(id)}
        >
          Delete
      </Button>
      </CardActions>
    </Card>
  );
}

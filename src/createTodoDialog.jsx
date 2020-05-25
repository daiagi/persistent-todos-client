import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: 5,
    margin: theme.spacing(2)
  },

  textArea: {
    width: 320,
    minHeight: 180,
    outline: 'none',
    margin: theme.spacing(1),
    fontSize: '0.9rem'
  },
  titleInput: {
    color: '#222',
    backgroundColor: 'white',
    margin: 0,
    outline: 'none',
    resize: 'none',
    width: '100%',
    border: 0,
    fontSize: '1.2rem'
  },
  inputContainer: {
    padding: '8px 0',
    border: 'none',
    boxShadow: 'inset 0 -1px 0 0 rgba(100,121,143,0.122)',

    lineHeight: '20px',
    minHeight: 'auto',
  }

}));

export default function CreateTodoDialog(props) {
  const { open, onClose, create } = props
  const classes = useStyles()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const okDisabled = () => !(title.length > 0 || content.length > 0);


  const close = () => {
    setTitle('');
    setContent('');
    onClose();
  }
  const onOk = () => {

    create({ title, content });
    close()


  }



  return (
    <div>

      <Dialog open={open} onClose={close}>

        <Paper className={classes.paper}>
          <div className={classes.inputContainer}>

            <input name="subjectbox"
              value={title} onChange={(e) => setTitle(e.target.value)}
              className={classes.titleInput}
              placeholder="Title" />

          </div>

          <div contentEditable value={content} onInput={(e) => {
            console.log(e.currentTarget.textContent); setContent(e.currentTarget.textContent)
          }} className={classes.textArea} />
        </Paper>

        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={onOk} disabled={okDisabled()} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

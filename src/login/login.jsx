
import { Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../authHandler';
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const validatePassword = (pass) => !!(pass && pass.length > 0);


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Login() {

  const { register, handleSubmit, watch } = useForm();
  const [loginClicked, setLoginClicked] = useState(false);
  const { login } = useAuth()

  const classes = useStyles();


  function isFormOk() {

    const emailValidated = validateEmail(watch('email'));
    const passwordOk = validatePassword(watch('password'));


    return emailValidated && passwordOk;
  }

  function onSubmit(data) {
    setLoginClicked(true);
    login(data.email, data.password)
  }

  return (
    <Container className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField id="email" name="email" label="Email" variant="outlined"
          inputRef={register({ required: true })}

          error={loginClicked && !validateEmail(watch('email'))}
        />
        <TextField id="password" name="password" label="Password" variant="outlined"
          error={loginClicked && !validatePassword(watch('password'))}
          InputProps={{ type: "password" }} inputRef={register({ required: true })}
        />
        <Button variant="contained" color="primary" type="submit" disabled={!isFormOk()}>
          Log in
        </Button>
      </form>
    </Container>
  );
}
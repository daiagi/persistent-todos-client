
import { Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WebAuth } from 'auth0-js';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../authHandler';
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const validatePassword = (pass) => !!(pass && pass.length > 0);

const auth0 = new WebAuth({
  clientID: 'Sw3MxnUXC0ioZfA1e1exC0pr19OejqG8',
  domain: 'bary.auth0.com',
  responseType: 'token id_token',
  audience: 'https://5tw0m2q7ck.execute-api.us-east-1.amazonaws.com/prod/api/todos',
  redirectUri: 'https://festive-bardeen-eb9748.netlify.app/',
  scope: 'openid profile CRUD:Todos'
});


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
    // login(data.email, data.password)
    auth0.authorize();
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
import React, { useMemo } from 'react';
import { useHistory } from "react-router-dom";

import config from './api/api.config';

// A context will be the way that we allow components lower down
// the tree to trigger the display of an error page
const ErrorStatusContext = React.createContext({});
const AuthContext = React.createContext();

// The top level component that will wrap our app's core features
export const AuthHandler = ({ children }) => {
  const [userName, setUserName] = React.useState();
  const [errorstatus, setErrorStatus] = React.useState({});
  const history = useHistory();
  const postHeader = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }


  }


  const login = async (email, password) => {
    const payload = JSON.stringify({ email, password });
    const loginResponse = await fetch(`${config.authApiUri}signin`, { body: payload, ...postHeader });
    if (loginResponse.status > 200) {
      setErrorStatus((prevState) => ({
        ...prevState,
        loginError:
        {
          code: loginResponse.status,
          message: loginResponse.statusText
        }
      }))
    } else {
      const loginInfo = await loginResponse.json()
      localStorage.setItem('accessToken', loginInfo.accessToken)
      setUserName(loginInfo.username)
      setErrorStatus((prevState) => { prevState.loginError && delete prevState.loginError })
      history.push('/home');


    }

  }

  const logOut = () => {
    localStorage.removeItem('accessToken')
    setUserName(undefined)
  }



  const error = useMemo(() => errorstatus, [errorstatus]);


  // We expose the context's value down to our components, while
  // also making sure to render the proper content to the screen
  return (
    <AuthContext.Provider value={{ login, logOut, userName }}>

      <ErrorStatusContext.Provider value={{ error }}>
        {children}
      </ErrorStatusContext.Provider>
    </AuthContext.Provider>

  );
};

// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
export const useErrorStatus = () => React.useContext(ErrorStatusContext);
export const useAuth = () => React.useContext(AuthContext);

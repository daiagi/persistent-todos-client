import React from 'react';
import { useErrorStatus, useLoadingStatus } from './componenets/errorHandler';

export const doQuery = ({
  url, callback, setErrorStatusCode, setLoadingStatus
}) => {
  setLoadingStatus(true);
  fetch(url)
    .then((data) => data.json())
    .then(({ code, status, ...responseData }) => {
      if (code > 400) {
        setErrorStatusCode(400);
      } else {
        callback(responseData);
      }
    }).finally(() => setLoadingStatus(false));
};

export const useQuery = ({ url, callback }) => {
  const { setErrorStatusCode } = useErrorStatus();
  const { setLoadingStatus, ..._ } = useLoadingStatus();
  React.useEffect(() => {
    doQuery({
      url,
      callback,
      setErrorStatusCode,
      setLoadingStatus
    });
  }, []);
};

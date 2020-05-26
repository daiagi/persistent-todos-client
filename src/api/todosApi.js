import { getToken } from "./authAPI";
import config from './api.config';



const urls = {
  collection: config.todosApiUri,
  single: (id) => `${config.todosApiUri}${id}`,

}


const headers = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

const requstOptions = (method, body) => ({
  method,
  headers: headers(),
  body
});


export const doQuery = (url, requstOptions, redirect) => {
  return fetch(url, requstOptions).then(response => {
    if (response.status > 400) {
      if (response.status === 401) {
        redirect();
        return Promise.reject();

      }
      throw Error(response.statusText)
    }
    return response;
  })
    .then((response) => response.json());
}



export const createTodo = (body) => doQuery(urls.collection, requstOptions('POST', JSON.stringify(body)))
export const readAllTodos = (redirect) => doQuery(urls.collection, requstOptions('GET'), redirect)
export const readTodo = (id) => doQuery(urls.single(id), requstOptions('GET'))
export const updateTodo = (id, body) => doQuery(urls.single(id), requstOptions('PUT', JSON.stringify(body)))
export const deleteTodo = (id) => doQuery(urls.single(id), requstOptions('DELETE'))
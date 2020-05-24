const serverUri = 'http://localhost:8080'

const urls = {
  collection: `${serverUri}/api/todos`,
  single: (id) => `${serverUri}/api/todos/${id}`,

}
const getToken = () => localStorage.getItem('accessToken');


const headers = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-access-token': getToken()
})

const requstOptions = (method, body) => ({
  method,
  headers: headers(),
  body
});

fetch('dfd, ')

export const doQuery = (url, requstOptions) => {
  return fetch(url, requstOptions).then(response => {
    if (response.status > 400) {
      throw Error(response.statusText)
    }
    return response;
  })
    .then((data) => data.json());
}



export const createTodo = (body) => doQuery(urls.collection, requstOptions('POST', JSON.stringify(body)))
export const readAllTodos = () => doQuery(urls.collection, requstOptions('GET'))
export const readTodo = (id) => doQuery(urls.single(id), requstOptions('GET'))
export const updateTodo = (id, body) => doQuery(urls.single(id), requstOptions('PUT', JSON.stringify(body)))
export const deleteTodo = (id) => doQuery(urls.single(id), requstOptions('DELETE'))
import { createStore } from 'retalk'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import app from './Model/app'
import home from './Model/home'
import mall from './Model/mall'
import user from './Model/user'
import service from './Model/service'
import progress from './Model/progress'

const store = createStore(
  {
    app,
    home,
    mall,
    user,
    service,
    progress
  },
  {
    plugin: [promiseMiddleware, thunkMiddleware],
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store

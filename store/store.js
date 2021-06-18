import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import usersReducer from "./reducers/usersReducer";
import penyakitReducer from "./reducers/penyakitReducer";
import errorReducer from './reducers/errorReducer'

let composeEnhancers = compose;
const middleware = [thunk];

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const rootReducer = combineReducers({
  auth: usersReducer,
  penyakit: penyakitReducer,
  errors: errorReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

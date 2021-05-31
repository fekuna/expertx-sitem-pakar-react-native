import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import usersReducer from "./reducers/usersReducer";

let composeEnhancers = compose;
const middleware = [thunk];

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const rootReducer = combineReducers({
  auth: usersReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

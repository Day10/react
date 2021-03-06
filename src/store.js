import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import unknow from './reducers'
import stateData from './initialState'

const logger = store => next => action => {
    let result;
    console.groupCollapsed('dispatching', action.type);
    console.log('prev state', store.getState());
    console.log('aciton', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
};
const saver = store => next => action => {
    let result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState());
    return result;
}
const storeFactory = (initialState = stateData) => 
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({ unknow }),
        (localStorage['react-redux']) ? 
            JSON.parse(localStorage['react-redux']) :
            initialState
    )

export default storeFactory;
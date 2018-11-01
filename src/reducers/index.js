import { combineReducers } from 'redux';
import C from '../constants';

export const test = (state = {}, action){
    switch (action.type) {
        case C.ADDCHAT:
            return {
                id: action.id
            };
        case C.ADDHOME:
            return {
                id: action.id
            };
        case C.ADDSYSTEM:
            return {
                id: action.id
            };
        case C.ADDEDITOR:
            return {
                id: action.id
            };
    }
}

export default combineReducers({
    test
}, {id:  0})
import { combineReducers } from 'redux'



const RootReducer = combineReducers({
    widgets: widgets
});

const widgets = (state = [], action) => {
    return state;
}

export default RootReducer;
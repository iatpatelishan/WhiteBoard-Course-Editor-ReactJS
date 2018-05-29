import { combineReducers } from 'redux'
import widgets from './widgets'
import topicId from './topicId'



const RootReducer = combineReducers({
    widgets,
    topicId
});

export default RootReducer;
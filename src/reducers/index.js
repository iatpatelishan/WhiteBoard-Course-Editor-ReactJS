import { combineReducers } from 'redux'
import widgets from './widgets'
import topicId from './topicId'
import preview from './preview'



const RootReducer = combineReducers({
    widgets,
    topicId,
    preview
});

export default RootReducer;
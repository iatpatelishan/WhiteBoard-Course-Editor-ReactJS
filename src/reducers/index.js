import { combineReducers } from 'redux'
import widgets from './widgets'
import topicId from './topicId'
import preview from './preview'
import lastWidgetType from './lastWidgetType'



const RootReducer = combineReducers({
    widgets,
    topicId,
    preview,
    lastWidgetType
});

export default RootReducer;
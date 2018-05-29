import * as constants from "../constants";
import 'array.prototype.move';
import WidgetService from '../services/WidgetService';

const widgets = (state = [], action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return [...state,
                {
                    id: state.length + 1,
                    text: 'New Widget',
                    widgetType: 'Heading',
                    size: '1'
                }]
        case 'DELETE_WIDGET':
            return state.filter(widget => widget.id != action.id)
        case 'MOVE_UP':
            let index = state.indexOf(action.widget);
            state.move(index, index - 1);
            return state.splice(0);
        case 'SET_WIDGET_TYPE':
            let newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(function (widget) {
                return widget.id === action.id})
            newState[index].widgetType = action.widgetType
            return newState;
        case 'TOGGLE_EDITING':
            newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(
                function (widget) {
                    return widget.id === action.id
                })
            newState[index].editing = action.editing
            console.log(newState)
            return newState
        case 'SET_TEXT_WIDGET':
            newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(
                function (widget) { return widget.id === action.id })
            newState[index].rawtext = action.text
            console.log(newState)
            return newState
        case constants.SAVE:
            WidgetService.instance.saveWigets(action.topicId, state);
            return state
        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state)
            newState = action.widgets
            return newState
        default:
            return state
    }
}

export default widgets;
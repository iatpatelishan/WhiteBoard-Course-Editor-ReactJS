import 'array.prototype.move';
import WidgetService from '../services/WidgetService';
import * as constants from "../constants";

const widgets = (state = [], action) => {
    let maxid = 0;
    Object.keys(state).forEach(function (key) {
        if (state[key].id > maxid) {
            maxid = state[key].id
        }
    });

    switch (action.type) {
        case 'ADD_WIDGET':
            return [...state,
                {
                    id: maxid + 1,
                    text: 'New Widget',
                    widgetType: 'Heading',
                    size: '1'
                }]
        case constants.DELETE_WIDGET:
            return state.filter(widget => widget.id != action.id)
        case constants.CLONE_WIDGET:
            let widget = JSON.parse(JSON.stringify(action.widget));
            widget.id = maxid + 1;
            return [...state, widget];
        case 'MOVE_UP':
            let index = state.indexOf(action.widget);
            state.move(index, index - 1);
            return state.splice(0);
        case 'SET_WIDGET_TYPE':
            let newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(function (widget) {
                return widget.id === action.id
            })
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
                function (widget) {
                    return widget.id === action.id
                })
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
        case constants.WIDGET_NAME_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.name = action.name
                }
                return Object.assign({}, widget)
            })
        case constants.HEADING_TEXT_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.text = action.text
                }
                return Object.assign({}, widget)
            })
        case constants.HEADING_SIZE_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.size = action.size
                }
                return Object.assign({}, widget)
            })
        case constants.PARAGRAPH_TEXT_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.text = action.text
                }
                return Object.assign({}, widget)
            })
        default:
            return state
    }
}

export default widgets;
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
        case constants.TOGGLE_PREVIEW:
            newState = JSON.parse(JSON.stringify(state))
            return newState.map(widget => {
                    widget.editing = action.preview
                return Object.assign({}, widget)
            })
        case constants.ENABLE_EDITING:
            newState = JSON.parse(JSON.stringify(state))
            return newState.map(widget => {
                if (widget.id === action.id) {
                    widget.editing = true
                } else {
                    widget.editing = false
                }
                return Object.assign({}, widget)
            })
        case constants.TOGGLE_EDITING:
            newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(
                function (widget) {
                    return widget.id === action.id
                })
            newState[index].editing = !newState[index].editing
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
        case constants.LIST_ITEM_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.listItems = action.listItems
                }
                return Object.assign({}, widget)
            })
        case constants.LIST_TYPE_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.listType = action.listType
                }
                return Object.assign({}, widget)
            })
        case constants.IMAGE_URL_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.src = action.src
                }
                return Object.assign({}, widget)
            })
        case constants.LINK_TEXT_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.text = action.text
                }
                return Object.assign({}, widget)
            })
        case constants.LINK_URL_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.href = action.href
                }
                return Object.assign({}, widget)
            })
        default:
            return state
    }
}

export default widgets;
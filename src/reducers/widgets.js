import 'array.prototype.move';
import WidgetService from '../services/WidgetService';
import * as constants from "../constants";
import swal from "sweetalert"
import elements from "./helperReducer/formElements"

const widgets = (state = [], action) => {
    let maxid = 0;
    Object.keys(state).forEach(function (key) {
        if (state[key].id > maxid) {
            maxid = state[key].id
        }
    });

    switch (action.type) {
        case constants.ADD_WIDGET:
            return [...state,
                {
                    id: maxid + 1,
                    text: 'New Widget',
                    widgetType: action.lastWidgetType,
                    size: '1',
                    editing: true
                }]
        case constants.DELETE_WIDGET:
            return state.filter(widget => widget.id != action.id)
        case constants.CLONE_WIDGET:
            let widget = JSON.parse(JSON.stringify(action.widget));
            widget.id = maxid + 1;
            return [...state, widget];
        case constants.MOVE_UP:
            let index = state.indexOf(action.widget);
            state.move(index, index - 1);
            return state.splice(0);
        case constants.MOVE_DOWN:
            index = state.indexOf(action.widget);
            state.move(index, index + 1);
            return state.splice(0);
        case constants.SET_WIDGET_TYPE:
            let newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(function (widget) {
                return widget.id === action.id
            })
            newState[index].widgetType = action.widgetType
            if (action.widgetType == 'List') {
                newState[index].listItems = '';
                newState[index].listType = 'UNORDERED';
            }
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
            return newState
        case constants.SET_TEXT_WIDGET:
            newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(
                function (widget) {
                    return widget.id === action.id
                })
            newState[index].rawtext = action.text
            return newState
        case constants.SAVE_WIDGETS:
            newState = JSON.parse(JSON.stringify(action.widgets))
            return newState;
        case constants.SAVE:
            WidgetService.instance.saveWigets(action.topicId, state);
            return state
        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state)
            newState = action.widgets
            return newState
        case constants.WIDGET_NAME_CHANGED:
            let conflict = false
            state.map(widget => {
                if (widget.id != action.id && widget.name == action.name) {
                    conflict = true
                }
            })
            if (conflict) {
                swal({
                    title: "Error!",
                    text: "Please enter unique Widget name!",
                    icon: "error",
                });
                return state
            } else {
                return state.map(widget => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget)
                })
            }
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
        case constants.FORM_ADD_ELEMENT:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.elements = elements(widget.elements,action)
                }
                return Object.assign({}, widget)
            })
        default:
            return state
    }
}

export default widgets;
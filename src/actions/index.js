import * as constants from "../constants";
import WidgetService from "../services/WidgetService";

let nextWidgetId = 0;
export const addWidget = (dispatch) => (
    dispatch({
        type: constants.ADD_WIDGET,
        id: nextWidgetId++
    })
);


export const toggleEditing = (dispatch, id, checked) => (
    dispatch({
        type: constants.TOGGLE_EDITING,
        id: id,
        editing: checked
    })
);


export const setWidgetType = (dispatch, id, widgetType) => (
    dispatch({
        type: constants.SET_WIDGET_TYPE,
        widgetType: widgetType, id: id
    })
);


export const deleteWidget = (dispatch,id) => (
    dispatch({
        type: constants.DELETE_WIDGET, id: id
    })
);

export const cloneWidget = (dispatch,widget) => (
    dispatch({
        type: constants.CLONE_WIDGET, widget: widget
    })
);


export const moveUp = (dispatch,widget) => (
    dispatch({
        type: 'MOVE_UP', widget: widget
    })
);


export const findAllWidgets = (dispatch, topicId) => {
    WidgetService.instance.findAllWidgetsForTopic(topicId)
        .then(widgets => dispatch({type: constants.FIND_ALL_WIDGETS, topicId: topicId, widgets: widgets}))
}

export const save = (dispatch,topicId) => {
    return(dispatch({type: constants.SAVE, topicId: topicId}));
};

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);

export const widgetNameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        name: newName})
)

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize})
)

export const paragraphTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)

export const listItemsChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LIST_ITEM_CHANGED,
        id: widgetId,
        listItems: newText})
)
export const listTypeChanged = (dispatch, widgetId, newType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType})
)

import * as constants from "../constants";
import WidgetService from "../services/WidgetService";

export const addWidget = (dispatch, lastWidgetType) => (
    dispatch({
        type: constants.ADD_WIDGET,
        lastWidgetType: lastWidgetType
    })
);

export const togglePreview = (dispatch,preview) => (
    dispatch({
        type: constants.TOGGLE_PREVIEW,
        preview: preview
    })
);

export const enableEditing = (dispatch, id, checked) => (
    dispatch({
        type: constants.ENABLE_EDITING,
        id: id
    })
);

export const toggleEditing = (dispatch, id, checked) => (
    dispatch({
        type: constants.TOGGLE_EDITING,
        id: id
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
        type: constants.MOVE_UP, widget: widget
    })
);

export const moveDown = (dispatch,widget) => (
    dispatch({
        type: constants.MOVE_DOWN, widget: widget
    })
);


export const findAllWidgets = (dispatch, topicId) => {
    WidgetService.instance.findAllWidgetsForTopic(topicId)
        .then(widgets => dispatch({type: constants.FIND_ALL_WIDGETS, topicId: topicId, widgets: widgets}))
}

export const saveWidgets = (dispatch,widgets) => {
    return(dispatch({type: constants.SAVE_WIDGETS, widgets: widgets}));
};

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

export const imageUrlChanged = (dispatch, widgetId, newUrl) => (
    dispatch({
        type: constants.IMAGE_URL_CHANGED,
        id: widgetId,
        src: newUrl})
)

export const linkTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LINK_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)

export const linkUrlChanged = (dispatch, widgetId, newUrl) => (
    dispatch({
        type: constants.LINK_URL_CHANGED,
        id: widgetId,
        href: newUrl})
)

export const addFormElement = (dispatch, widgetId, elementType) => (
    dispatch({
        type: constants.FORM_ADD_ELEMENT,
        id: widgetId,
        elementType: elementType})
)

export const changeLabelFormElement = (dispatch, widgetId, elementId, label) => (
    dispatch({
        type: constants.FORM_CHANGE_LABEL,
        id: widgetId,
        elementId: elementId,
        label: label
    })
)

export const changeLabelDirectionFormElement = (dispatch, widgetId, elementId, labelDirection) => (
    dispatch({
        type: constants.FORM_CHANGE_LABEL_DIRECTION,
        id: widgetId,
        elementId: elementId,
        labelDirection: labelDirection
    })
)

export const changeCSSFormElement = (dispatch, widgetId, elementId, cssStyle) => (
    dispatch({
        type: constants.FORM_CHANGE_CSS_STYLE,
        id: widgetId,
        elementId: elementId,
        cssStyle: cssStyle
    })
)

export const changeOptionsFormElement = (dispatch, widgetId, elementId, options) => (
    dispatch({
        type: constants.FORM_CHANGE_OPTIONS,
        id: widgetId,
        elementId: elementId,
        options: options
    })
)

export const changeAnswerFormElement = (dispatch, widgetId, elementId, answer) => (
    dispatch({
        type: constants.FORM_CHANGE_ANSWER,
        id: widgetId,
        elementId: elementId,
        answer: answer
    })
)
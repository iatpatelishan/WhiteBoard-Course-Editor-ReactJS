let nextWidgetId = 0;
export const addWidget = (dispatch) => (
    dispatch({
        type: 'ADD_WIDGET',
        id: nextWidgetId++
    })
);


export const toggleEditing = (dispatch, id, checked) => (
    dispatch({
        type: 'TOGGLE_EDITING',
        id: id,
        editing: checked
    })
);


export const setWidgetType = (dispatch, id, widgetType) => (
    dispatch({
        type: 'SET_WIDGET_TYPE',
        widgetType: widgetType, id: id
    })
);


export const deleteWidget = (dispatch,id) => (
    dispatch({
        type: 'DELETE_WIDGET', id: id
    })
);


export const moveUp = (dispatch,widget) => (
    dispatch({
        type: 'MOVE_UP', widget: widget
    })
);
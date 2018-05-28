

let nextWidgetId = 0;
export const addWidget = (dispatch, text) => (
    dispatch( {
        type: 'ADD_WIDGET',
        id: nextWidgetId++,
        text: text
    }))
import 'array.prototype.move';

const widgets = (state = [], action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return [...state,
                {
                    id: state.length + 1,
                    text: action.text
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
            return newState

        default:
            return state
    }
}

export default widgets;
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
        default:
            return state
    }
}

export default widgets;
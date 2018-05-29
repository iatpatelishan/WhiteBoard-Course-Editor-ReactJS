import * as constants from "../constants";
import 'array.prototype.move';

const lastWidgetType = (state = 'Heading', action) => {
    switch (action.type) {
        case constants.SET_WIDGET_TYPE:
            let newState = JSON.parse(JSON.stringify(state))
            newState = action.widgetType;
            return newState;
        default:
            return state
    }
}

export default lastWidgetType;
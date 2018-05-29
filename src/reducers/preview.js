import * as constants from "../constants";
import 'array.prototype.move';

const preview = (state = true, action) => {
    switch (action.type) {
        case constants.TOGGLE_PREVIEW:
            let newState = JSON.parse(JSON.stringify(state))
            newState = !action.preview;
            return newState;
        default:
            return state
    }
}

export default preview;
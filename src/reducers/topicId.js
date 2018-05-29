import * as constants from "../constants";
import 'array.prototype.move';
import WidgetService from '../services/WidgetService';

const topicId = (state = 0, action) => {
    switch (action.type) {
        case constants.FIND_ALL_WIDGETS:
            let newState = JSON.parse(JSON.stringify(state))
            newState = action.topicId;
            return newState;
        default:
            return state
    }
}

export default topicId;
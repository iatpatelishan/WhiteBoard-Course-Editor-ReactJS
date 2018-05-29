let _singleton = Symbol();
const TOPIC_WIDGET_API_URL = process.env.REACT_APP_JAVA_SERVER + '/api/topic/TID/widget';
const TOPIC_WIDGET_SAVE_API_URL = process.env.REACT_APP_JAVA_SERVER + '/api/topic/TID/savewidget';


class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton];
    }

    findAllWidgetsForTopic(topicId) {
        return fetch(TOPIC_WIDGET_API_URL.replace('TID', topicId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {return []})
    }

    saveWigets(topicId, widgets){
        return fetch(TOPIC_WIDGET_SAVE_API_URL.replace('TID', topicId), {
            method: 'post',
            body: JSON.stringify(widgets),
            headers: {
                'content-type': 'application/json'}
        });
    }

}

export default WidgetService;
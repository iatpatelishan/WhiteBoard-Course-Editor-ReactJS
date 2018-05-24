let _singleton = Symbol();
const LESSON_TOPIC_API_URL = 'http://localhost:8080/api/lesson/LID/topic';
const TOPIC_API_URL = 'http://localhost:8080/api/topic/TOPIC_ID';


class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton];
    }


    createTopic(lessonId, topic) {
        return fetch(LESSON_TOPIC_API_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(topic),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            });
    }

    findAllTopicsForLesson(lessonId) {
        return fetch(
            LESSON_TOPIC_API_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {return "[]"})
    }

    deleteTopic(topicId) {
        return fetch(TOPIC_API_URL.replace('TOPIC_ID', topicId), {
            method: 'DELETE'
        })
    }


}

export default TopicService;
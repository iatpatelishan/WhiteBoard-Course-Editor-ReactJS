let _singleton = Symbol();
const MODULE_LESSON_API_URL = 'http://localhost:8080/api/module/MID/lesson';
const LESSON_API_URL = 'http://localhost:8080/api/lesson/LESSON_ID';


class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton];
    }


    createLesson(moduleId, lesson) {
        return fetch(MODULE_LESSON_API_URL.replace('MID', moduleId),
            {
                body: JSON.stringify(module),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            });
    }

    findAllLessonsForModule(moduleId) {
        return fetch(
            MODULE_LESSON_API_URL
                .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {return "{}"})
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL.replace('LESSON_ID', lessonId), {
            method: 'DELETE'
        })
    }


}

export default ModuleService;
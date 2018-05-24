let _singleton = Symbol();
const COURSE_MODULE_API_URL = process.env.REACT_APP_JAVA_SERVER+'/api/course/CID/module';
const MODULE_API_URL = process.env.REACT_APP_JAVA_SERVER+'/api/module/MODULE_ID';


class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton];
    }


    createModule(courseId, module) {
        return fetch(COURSE_MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(module),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            });
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            COURSE_MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {return "[]"})
    }

    deleteModule(moduleId) {
        return fetch(MODULE_API_URL.replace('MODULE_ID', moduleId), {
            method: 'DELETE'
        })
    }


}

export default ModuleService;
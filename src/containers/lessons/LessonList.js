import React from 'react';
import LessonService from "../../services/LessonService";
import LessonListItem from "../lessons/LessonListItem";

export default class ModuleEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lessons: [], lesson:{title:''}};
        this.lessonService = LessonService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount-->");
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        console.log("componentWillReceiveProps");
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.moduleId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    findAllLessonsForModule(moduleId) {
        console.log("Finding all lessons");
        this.lessonService
            .findAllLessonsForModule(moduleId)
            .then((lessons) => {
                console.log("Setting lessons");
                this.setLessons(lessons);
            });
    }

    setLessons(lessons) {
        console.log("Setting Lessons");
        this.setState({lessons: lessons});
    }

    setLessonTitle(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    createLesson() {
        return this.lessonService.createLesson(this.state.moduleId, this.state.lesson)
            .then(() => {
                return this.findAllLessonsForModule(this.state.moduleId);
            })
    }

    deleteLesson(lessonId) {
        this.lessonService.deleteLesson(lessonId)
            .then(() => {
                this.findAllLessonsForModule(this.state.moduleId)
            });
    }

    renderLessons() {
        var lessons = this.state.lessons.map((lesson) => {
            return (<LessonListItem key={lesson.id} lesson={lesson} deleteLesson={this.deleteLesson}
                                    moduleId={this.state.moduleId}/>)
        })
        return (
            lessons
        )
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark navbar-dark-clr">
                    <div className="" id="navbarColor01">
                        <ul class="navbar-nav mr-auto">
                            {this.renderLessons()}
                        </ul>
                    </div>
                </nav>

                <input placeholder="New Lesson" value={this.state.lesson.title} onChange={this.setLessonTitle}/>
                <button onClick={this.createLesson} className="btn btn-primary btn-block">Create</button>

            </div>
        )
    }
}

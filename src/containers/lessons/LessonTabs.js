import React from 'react';
import LessonService from "../../services/LessonService";
import LessonTabsItem from "../../components/LessonTabsItem";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LessonEditor from "../lessons/LessonEditor";
import swal from "sweetalert";

export default class LessonTabs extends React.Component {

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
        this.showaddLesson = this.showaddLesson.bind(this);
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

    setLessonTitle(title) {
        this.setState({lesson: {title: title}});
    }

    createLesson() {
        return this.lessonService.createLesson(this.state.moduleId, this.state.lesson)
            .then(() => {
                return this.findAllLessonsForModule(this.state.moduleId);
            })
    }

    showaddLesson(){
        swal({
            text: 'Create Lesson',
            content: "input",
            button: {
                text: "Create!",
                closeModal: false,
            },
        })
            .then(name => {
                if (!name) throw null;

                this.setLessonTitle(name);
                return this.createLesson();
            })
            .then(() => {
                swal("Poof! New Lesson Added!", {
                    icon: "success",
                });
            })
            .catch(err => {
                if (err) {
                    swal("Oh noes!", "The AJAX request failed!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }

    deleteLesson(lessonId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Lesson!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.lessonService.deleteLesson(lessonId)
                        .then(() => {
                            this.findAllLessonsForModule(this.state.moduleId)
                        })
                        .then(() => {
                        swal("Poof! Lesson has been deleted!", {
                            icon: "success",
                        });
                    });
                }
            });


    }



    renderLessons() {
        var lessons = this.state.lessons.map((lesson) => {
            return (<LessonTabsItem key={lesson.id} lesson={lesson} deleteLesson={this.deleteLesson}
                                  courseId={this.state.courseId}  moduleId={this.state.moduleId}/>)
        });
        return (
            lessons
        )
    }

    render() {
        console.log(this.state);
        return (
            <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark navbar-dark-clr">
                    <div className="" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            {this.renderLessons()}
                        </ul>
                    </div>
                    <ul className="nav navbar-nav navbar-right ml-auto">
                        <li className="nav-item"><i onClick={() => {this.showaddLesson()}} className="fa fa-2x fa-plus text-white"></i></li>
                    </ul>
                </nav>
                <div>
                    <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonEditor}/>
                </div>
            </div>
            </Router>
        )
    }
}

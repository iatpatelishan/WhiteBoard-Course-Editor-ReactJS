import React, {Component} from "react";
import ModuleList from "./modules/ModuleList";
import CourseService from '../services/CourseService';
import './CourseEditor.css';

class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: '', course: {}};
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
    }

    selectCourse(courseId) {
        return this.courseService.findCourseById(courseId)
            .then((course) => {
                this.setState({courseId: courseId, course: course})
            });
    }

    render() {
        return (
            <div>
                <ModuleList courseId={this.state.courseId} course={this.state.course}/>
            </div>
        );
    }

}

export default CourseEditor;
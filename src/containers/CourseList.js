import React, {Component} from 'react';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';

class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses: []};
        this.updateCourseList = this.updateCourseList.bind(this);
    }

    componentDidMount() {
        this.updateCourseList();
    }

    updateCourseList() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses})
            });
    }

    render() {
        return (
            <div>
                <div className="wbdv-course-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">Title</div>
                            <div className="col-md-2">Owned By</div>
                            <div className="col-md-2">Last Modified</div>
                            <div className="col-md-2">&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="wbdv-course-list container">
                        {this.courseRows()}
                </div>
            </div>
        )
    }

    courseRows() {
        var rows = this.state.courses.map((course) => {
            return (<CourseRow key={course.id} course={course}/>)
        })
        return (
            rows
        )
    }
}

export default CourseList;

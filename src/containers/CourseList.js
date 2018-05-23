import React, {Component} from 'react';
import CourseRow from '../components/CourseRow';
import CreateCourse from './CreateCourse';
import CourseService from '../services/CourseService';
import swal from "sweetalert";



class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses: []};
        this.updateCourseList = this.updateCourseList.bind(this);
        this.deleteCourseById = this.deleteCourseById.bind(this);
    }

    componentDidMount() {
        this.updateCourseList();
    }

    updateCourseList() {
        console.log("Finding courses");
        return this.courseService.findAllCourses()
            .then((courses) => {
                console.log("Updating State after find courses");
                return this.setState({courses: courses});
            });
    }

    deleteCourseById(id){
        console.log("Deleting courses");
        return this.courseService.deleteCourseById(id)
            .then(() => this.updateCourseList());
    }

    render() {
        return (
            <div>
                <CreateCourse updateCourseList={this.updateCourseList} />
                <div className="wbdv-course-manager">
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
                </div>

                <i className="btn-fab fa fa-3x fa-plus-circle wbdv-create-btn" onClick={() => {
                    swal("Hello world!")
                }}></i>
            </div>

        )
    }

    courseRows() {
        var rows = this.state.courses.map((course) => {
            return (<CourseRow key={course.id} course={course} deleteCourseById={this.deleteCourseById} />)
        })
        return (
            rows
        )
    }
}

export default CourseList;

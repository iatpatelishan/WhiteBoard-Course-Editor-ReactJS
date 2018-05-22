import React, {Component} from 'react';
import './CourseManager.css';
import $ from "jquery";
import swal from 'sweetalert';
import CourseList from './CourseList';
import CreateCourse from './CreateCourse'



class CourseManager extends Component {

    render() {
        return (
            <div>
                <CreateCourse/>
                <div className="wbdv-course-manager">
                    <CourseList/>
                </div>

                <i className="btn-fab fa fa-3x fa-plus-circle wbdv-create-btn" onClick={() => {
                    swal("Hello world!")
                }}></i>
            </div>
        )
    }
}

export default CourseManager;
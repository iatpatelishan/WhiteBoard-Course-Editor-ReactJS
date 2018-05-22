import React, {Component} from 'react';
import './CourseManager.css';
import $ from "jquery";
import swal from 'sweetalert';
import CourseList from './CourseList'


const navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">

            <div className="form input-group input-group-lg">
                <a className="navbar-brand" href="#"><h4>Course Manager</h4></a>
                <input className="form-control add-course-input" type="text" placeholder="New Course Title"/>
                <div class="wbdv-top-create-outer">
                    <div class="wbdv-top-create-inner">
                    </div>
                    <i className="fa fa-3x fa-plus-circle wbdv-create-btn" onClick={() => {
                        swal("Hello world!")
                    }}></i>
                </div>
            </div>
        </nav>
    );
}

class CourseManager extends Component {
    render() {
        return (
            <div>
                {navbar()}
                <br/><br/><br/><br/>
                <div>
                    <CourseList/>
                </div>

                <i class="btn-fab fa fa-3x fa-plus-circle wbdv-create-btn" onClick={() => {
                    swal("Hello world!")
                }}></i>
            </div>
        )
    }
}

export default CourseManager;
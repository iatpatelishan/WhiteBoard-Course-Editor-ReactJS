import React, {Component} from 'react';
import './CourseManager.css';
import $ from "jquery";
import swal from 'sweetalert';
import CourseList from './CourseList';


class CourseManager extends Component {

    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <CourseList/>
            </div>
        )
    }
}

export default CourseManager;
import React, {Component} from 'react';
import CourseService from '../services/CourseService';
import swal from 'sweetalert';

class CreateCourse extends Component{
    constructor(props){
        super(props);
        this.state = {course: {title: ''}};
        this.courseService = CourseService.instance;
        this.updateTitleInState = this.updateTitleInState.bind(this);
        this.newCourse = this.newCourse.bind(this);
    };



    updateTitleInState(event){
        this.setState({
            course: {title: event.target.value}
        });
    }

    newCourse() {
        this.courseService.createCourse(this.state.course).then(this.props.updateCourseList);
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">

                <div className="form input-group input-group-lg">
                    <a className="navbar-brand" href="#"><h4>Course Manager</h4></a>
                    <input className="form-control add-course-input" type="text" placeholder="New Course Title"
                           onChange={this.updateTitleInState}/>
                    <div className="wbdv-top-create-outer">
                        <div className="wbdv-top-create-inner">
                        </div>
                        <i className="fa fa-3x fa-plus-circle wbdv-create-btn" onClick={this.newCourse}></i>
                    </div>
                </div>
            </nav>
        );
    }
}

export default CreateCourse;
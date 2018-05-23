import React, {Component} from 'react';
import Moment from 'moment';
import swal from "sweetalert";
import TimeAgo from 'timeago-react';
import en from 'timeago.js/locales/en';
import { Link } from 'react-router-dom'




class CourseRow extends Component {
    constructor(props) {
        super(props);
        this.alertDelete = this.alertDelete.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse(){
        var id = this.props.course.id;
        this.props.deleteCourseById(id)
            .then(swal("Poof! Your course has been deleted!", {
                icon: "success",
            }));
    }

    alertDelete(event) {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this course!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.deleteCourse();
                }
            });

    }

    render() {
        var dt = this.props.course.modified;

        return (
            <div className="row wbdv-course-row">
                <div className="col-lg-6"><Link to={`/course/${this.props.course.id}/edit`} >{this.props.course.title}</Link></div>
                <div className="col-lg-2">me</div>
                <div className="col-lg-2"><TimeAgo datetime={dt} locale={en}></TimeAgo></div>
                <div className="col-lg-2"><i className="fa fa-times fa-2x" onClick={this.alertDelete}></i></div>
            </div>
        )
    }
}

export default CourseRow;
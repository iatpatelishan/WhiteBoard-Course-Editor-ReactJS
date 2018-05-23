import React, {Component} from 'react';
import Moment from 'moment';
import swal from "sweetalert";

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
        Moment.locale('en');
        var dt = this.props.course.lastModified;


        return (
            <div className="row wbdv-course-row">
                <div className="col-lg-6">{this.props.course.title}</div>
                <div className="col-lg-2">me</div>
                <div className="col-lg-2">{Moment(dt).format('DD MMM, YY')}</div>
                <div className="col-lg-2"><i className="fa fa-times fa-2x" onClick={this.alertDelete}></i></div>
            </div>
        )
    }
}

export default CourseRow;
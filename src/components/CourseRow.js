import React from 'react';
import Moment from 'moment';

class CourseRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        Moment.locale('en');
        var dt = this.props.course.lastModified;

        return (
            <div className="row wbdv-course-row">
                <div className="col-lg-6">{this.props.course.title}</div>
                <div className="col-lg-2">me</div>
                <div className="col-lg-2">{Moment(dt).format('DD MMM, YY')}</div>
                <div className="col-lg-2">Delete</div>
            </div>
        )
    }
}
export default CourseRow;
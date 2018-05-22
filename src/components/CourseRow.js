import React from 'react';
class CourseRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row wbdv-course-row">
                <div className="col-lg-6">{this.props.course.title}</div>
                <div className="col-lg-2">me</div>
                <div className="col-lg-2">{this.props.course.lastModified}</div>
                <div className="col-lg-2">Delete</div>
            </div>
        )
    }
}
export default CourseRow;
import React from 'react';
import {Link} from 'react-router-dom';


export default class LessonTabsItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <div className='d-inline'>
                    <Link className="nav-link  text-white"
                          to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                        {this.props.lesson.title}
                    </Link>
                <span className="close-btn"  onClick={() => {
                this.props.deleteLesson(this.props.lesson.id)
            }}><i className="fa fa-times-circle-o wbdv-lesson-close"></i></span>
                </div>
            </li>
        )
    }
}

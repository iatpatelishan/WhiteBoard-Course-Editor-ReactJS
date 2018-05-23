import React from 'react';
import {Link} from 'react-router-dom';


export default class LessonListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <div className='d-inline'>
                <a href="#" className="nav-link  text-white">
                    {this.props.lesson.title}
                </a>
                <span className="close-btn"  onClick={() => {
                this.props.deleteLesson(this.props.lesson.id)
            }}><i className="fa fa-times-circle-o wbdv-lesson-close"></i></span>
                </div>
            </li>
        )
    }
}

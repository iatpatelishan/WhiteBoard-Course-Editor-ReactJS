import React from 'react';
import {Link} from 'react-router-dom';


export default class TopicTabsItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li >
                <div className='d-inline'>
                    <Link className="btn btn-secondary"
                          to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
                        {this.props.topic.title}
                    </Link>
                <span className="close-btn"  onClick={() => {
                this.props.deleteTopic(this.props.topic.id)
            }}><i className="fa fa-times-circle-o wbdv-topic-close"></i></span>
                </div>
            </li>
        )
    }
}

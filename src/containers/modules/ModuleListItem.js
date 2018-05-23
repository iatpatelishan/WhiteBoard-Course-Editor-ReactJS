import React from 'react';
import {Link} from 'react-router-dom';


export default class ModuleListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>

                <button onClick={() => {
                    this.props.deleteModule(this.props.module.id)
                }}>Delete
                </button>
            </li>
        )
    }
}

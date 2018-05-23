import React from 'react';
import {Link} from 'react-router-dom';


export default class ModuleListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item wbdv-module-list-item">
                <div className="row">
                <div className="col-10">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>
                </div>
                <div className="col-1 wbdv-module-close">
                    <i onClick={() => {
                        this.props.deleteModule(this.props.module.id)
                    }} className="fa fa-times-circle-o "></i>
                </div>
                </div>

            </li>
        )
    }
}

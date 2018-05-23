import React from 'react';

export default class ModuleListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">{this.props.module.title}
                <button onClick={() => {this.props.deleteModule(this.props.module.id)}}>DELETE</button>
            </li>
        )
    }
}

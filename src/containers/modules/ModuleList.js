import React from 'react';

export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', module: {title: ''}}
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    setModuleTitle(event){
        this.setState({module: {title: event.target.value}});
    }

    createModule(){
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h4>Module List for courseId:
                    {this.state.courseId}</h4>
                <input placeholder="New Module" value={this.state.module.title} onChange={this.setModuleTitle} />
                <button onClick={this.createModule}>Create</button>
            </div>
        )
    }
}

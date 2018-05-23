import React from 'react';
import ModuleService from '../../services/ModuleService';
import ModuleListItem from '../modules/ModuleListItem';


export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', module: {title: ''}, modules: []};
        this.moduleService = ModuleService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.setModules = this.setModules.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    findAllModulesForCourse(courseId) {
        console.log("Finding all modules");
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }

    setModules(modules) {
        console.log("Setting Modules");
        this.setState({modules: modules})
    }

    setModuleTitle(event) {
        this.setState({module: {title: event.target.value}});
    }

    createModule() {
        return this.moduleService.createModule(this.state.courseId, this.state.module)
            .then(() => {
                return this.findAllModulesForCourse(this.state.courseId);
            })
    }

    deleteModule(moduleId) {
        this.moduleService.deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId)
            });
    }

    renderModules() {
        var modules = this.state.modules.map((module) => {
            return (<ModuleListItem key={module.id} module={module} deleteModule={this.deleteModule}/>)
        })
        return (
            <ul className="list-group">{modules}</ul>
        )
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <h4>Module List for courseId:
                    {this.state.courseId}</h4>
                <input placeholder="New Module" value={this.state.module.title} onChange={this.setModuleTitle}/>
                <button onClick={this.createModule} className="btn btn-primary btn-block">Create</button>

                <hr/>
                {this.renderModules()}
            </div>
        )
    }
}

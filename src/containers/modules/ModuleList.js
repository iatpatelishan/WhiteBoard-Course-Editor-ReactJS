import React from 'react';
import ModuleService from '../../services/ModuleService';
import ModuleListItem from '../modules/ModuleListItem';
import ModuleEditor from '../modules/ModuleEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom';


export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', course:{}, module: {title: ''}, modules: []};
        this.moduleService = ModuleService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setCourse = this.setCourse.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.setModules = this.setModules.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setCourse(this.props.course);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setCourse(newProps.course);
        this.findAllModulesForCourse(newProps.courseId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setCourse(course) {
        this.setState({course: course});
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
            return (<ModuleListItem key={module.id} module={module} deleteModule={this.deleteModule} courseId={this.state.courseId} />)
        })
        return (
            <ul className="list-group">{modules}</ul>
        )
    }


    render() {
        console.log(this.state);
        return (
            <Router>
            <div className="row">
                <div className="col-3 wbdv-module-panel">
                    <div className="top-bar">
                        <nav className="navbar navbar-dark navbar-dark-clr">
                            <a className="navbar-brand" href="#">{this.state.course.title}</a>
                        </nav>
                    </div>
                    <input placeholder="New Module" value={this.state.module.title} onChange={this.setModuleTitle}/>
                    <button onClick={this.createModule} className="btn btn-primary btn-block">Create</button>

                    <hr/>
                    {this.renderModules()}
                </div>
                <div className="col-9">
                    <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}/>
                </div>
            </div>
            </Router>
        )
    }
}

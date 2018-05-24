import React from 'react';
import ModuleService from '../../services/ModuleService';
import ModuleListItem from '../../components/ModuleListItem';
import ModuleEditor from '../modules/ModuleEditor';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import swal from "sweetalert";


export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', course:{}, module: {title: ''}, selectedModule:{title:''}, modules: [], active:''};
        this.moduleService = ModuleService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setCourse = this.setCourse.bind(this);
        this.setActive = this.setActive.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.setModules = this.setModules.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.showaddModule = this.showaddModule.bind(this);
        this.setSelectedModule = this.setSelectedModule.bind(this);
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

    setSelectedModule(module){
        this.setState({selectedModule: module});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setCourse(course) {
        this.setState({course: course});
    }

    setActive(id){
        this.setState({active: id});
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

    setModuleTitle(title) {
        this.setState({module: {title: title}});
    }

    createModule() {
        return this.moduleService.createModule(this.state.courseId, this.state.module)
            .then(() => {
                return this.findAllModulesForCourse(this.state.courseId);
            })
    }

    deleteModule(moduleId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Module!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.moduleService.deleteModule(moduleId)
                        .then(() => {
                            this.findAllModulesForCourse(this.state.courseId)
                        }).then(() => {
                            swal("Poof! Module has been deleted!", {
                                icon: "success",
                            });
                        });
                }
            });

    }

    renderModules() {
        var modules = this.state.modules.map((module) => {
            const className = this.state.active == module.id ? 'wbdv-module-active': '';
            return (<ModuleListItem key={module.id}
                                    module={module}
                                    setSelectedModule={this.setSelectedModule}
                                    deleteModule={this.deleteModule}
                                    courseId={this.state.courseId}
                                    setActive={this.setActive}
                                    className={className}
            />)
        });
        return (
            <div>
            <ul className="list-group wbdv-module-list fill">
                {modules}
            </ul>
            </div>
        )
    }

    showaddModule(event){
        swal({
            text: 'Create Module',
            content: {
                element: "input",
                attributes: {
                    placeholder: "Module Name",
                    type: "text"
                }
            },
            button: {
                text: "Create!",
                closeModal: false,
            },
        })
            .then(name => {
                if (!name) throw null;

                this.setModuleTitle(name);
                return this.createModule();
            })
            .then(() => {
                swal("Poof! New Module Added!", {
                    icon: "success",
                });
            })
            .catch(err => {
                if (err) {
                    swal("Oh noes!", "The AJAX request failed!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }


    render() {
        return (
            <Router>
            <div className="row wbdv-100vh">
                <div className="col-lg-3 wbdv-module-panel">
                    <div className="wbdv-top-bar">
                        <nav className="navbar navbar-dark navbar-dark-clr">
                            <a className="navbar-brand">
                                <a className="text-white" href={`/courses`}><i className="fa fa-times wbdv-close-editor"></i></a>
                                <span>{this.state.course.title}</span>
                            </a>
                        </nav>
                    </div>
                    <div className="container wbdv-margin-top-20">
                        {this.renderModules()}
                        <i onClick={() => {this.showaddModule()}} className="fa fa-2x fa-plus text-white wbdv-module-add"></i>
                    </div>
                </div>
                <div className="col-lg-9 wbdv-lesson-panel">
                    <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}/>
                </div>
            </div>
            </Router>
        )
    }
}

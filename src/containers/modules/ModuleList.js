import React from 'react';
import ModuleService from '../../services/ModuleService';
import ModuleListItem from '../modules/ModuleListItem';
import ModuleEditor from '../modules/ModuleEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import swal from "sweetalert";


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
        this.showaddModule = this.showaddModule.bind(this);
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
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                        });
                }
            });

    }

    renderModules() {
        var modules = this.state.modules.map((module) => {
            return (<ModuleListItem key={module.id} module={module} deleteModule={this.deleteModule} courseId={this.state.courseId} />)
        })
        return (
            <div>
            <ul className="list-group wbdv-module-list">
                {modules}
            </ul>
            </div>
        )
    }

    showaddModule(event){
        swal({
            text: 'Create Module.',
            content: "input",
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
            <div className="row">
                <div className="col-lg-3 wbdv-module-panel">
                    <div className="wbdv-top-bar">
                        <nav className="navbar navbar-dark navbar-dark-clr">
                            <a className="navbar-brand">{this.state.course.title}</a>
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

import React, {Component} from "react";
import LessonService from "../../services/LessonService";
import TopicTabs from "../topics/TopicTabs";

export default class LessonEditor extends Component {
    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.state = {courseId: '', moduleId: '', lessonId:''};
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setLessonId(this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLessonId(newProps.match.params.lessonId);
    }

    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }


    render(){
        return(
            <div className="container">
                <TopicTabs courseId={this.state.courseId} moduleId={this.state.moduleId} lessonId={this.state.lessonId} />
            </div>
        )
    }
}
import React, {Component} from "react";
import WidgetApp from "../widget/WidgetApp";
import {Provider} from "react-redux";
import store from "../../store/courseEditor"
import WidgetService from "../../services/WidgetService"


export default class TopicEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lessonId:'', topicId: ''};
        this.widgetService = WidgetService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.setTopicId = this.setTopicId.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setLessonId(this.props.match.params.lessonId);
        this.setTopicId(this.props.match.params.topicId);

    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLessonId(newProps.match.params.lessonId);
        this.setTopicId(newProps.match.params.topicId);
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

    setTopicId(topicId) {
        this.setState({topicId: topicId});
    }



    render(){
        return(
            <Provider store={store}>
                <WidgetApp topicId={this.state.topicId} />
            </Provider>
        )
    }
}
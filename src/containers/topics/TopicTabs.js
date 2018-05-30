import React from 'react';
import TopicService from "../../services/TopicService";
import TopicTabsItem from "../../components/TopicTabsItem";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TopicEditor from "../topics/TopicEditor";
import swal from "sweetalert";

export default class TopicTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lessonId: '', topics: [], topic: {title: ''}};
        this.topicService = TopicService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.findAllTopicsForLesson = this.findAllTopicsForLesson.bind(this);
        this.setTopics = this.setTopics.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.showaddTopic = this.showaddTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.lessonId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    findAllTopicsForLesson(lessonId) {
        this.topicService
            .findAllTopicsForLesson(lessonId)
            .then((topics) => {
                this.setTopics(topics);
            });
    }

    setTopics(topics) {
        this.setState({topics: topics});
    }

    setTopicTitle(title) {
        this.setState({topic: {title: title}});
    }

    createTopic() {
        return this.topicService.createTopic(this.state.lessonId, this.state.topic)
            .then(() => {
                return this.findAllTopicsForLesson(this.state.lessonId);
            })
    }

    showaddTopic() {
        swal({
            text: 'Create Topic',
            content: {
                element: "input",
                attributes: {
                    placeholder: "Topic Name",
                    type: "text"
                }
            },
            inputPlaceholder: 'Topic Name',
            button: {
                text: "Create!",
                closeModal: false,
            },
        })
            .then(name => {
                if (!name) throw null;

                this.setTopicTitle(name);
                return this.createTopic();
            })
            .then(() => {
                swal("Poof! New Topic Added!", {
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

    deleteTopic(topicId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Topic!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.topicService.deleteTopic(topicId)
                        .then(() => {
                            this.findAllTopicsForLesson(this.state.lessonId)
                        })
                        .then(() => {
                            swal("Poof! Topic has been deleted!", {
                                icon: "success",
                            });
                        });
                }
            });


    }


    renderTopics() {
        var topics = this.state.topics.map((topic) => {
            return (<TopicTabsItem key={topic.id} topic={topic} deleteTopic={this.deleteTopic}
                                   courseId={this.state.courseId}
                                   moduleId={this.state.moduleId}
                                   lessonId={this.state.lessonId}/>)
        });
        return (
            topics
        )
    }

    render() {
        return (
                <div className="container-topic">
                    <h3>Topic Editor</h3>
                    <nav className="navbar navbar-expand-lg navbar-light wbdb-topic-navbar">
                        <div className="" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                {this.renderTopics()}
                            </ul>
                        </div>
                        <ul className="nav navbar-nav navbar-right ml-auto">
                            <li className="nav-item"><i onClick={() => {
                                this.showaddTopic()
                            }} className="fa fa-2x fa-plus"></i></li>
                        </ul>
                    </nav>
                    <div>
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId" component={TopicEditor}/>
                    </div>
                </div>
        )
    }
}

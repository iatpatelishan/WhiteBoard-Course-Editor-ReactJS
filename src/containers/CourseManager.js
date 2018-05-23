import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './CourseManager.css';
import CourseList from './courses/CourseList';
import CourseEditor from './CourseEditor';


class CourseManager extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;
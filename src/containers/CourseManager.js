import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './CourseManager.css';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';


class CourseManager extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Router>

                <div>
                    <Route path="/course"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId/edit"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;
import React, {Component} from 'react';
import CourseRow from '../components/CourseRow';

class CourseList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                        <CourseRow/>
                        <CourseRow/>
                        <CourseRow/>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;

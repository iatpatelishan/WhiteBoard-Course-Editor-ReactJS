import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions"
import WidgetComponent from '../../components/Widget';
import AddWidgetComponent from '../../components/AddWidget';


const WidgetListComponent = ({widgets}) => (
    <div>
        <h1>Widget Editor</h1>

        <div className="btn btn-primary">
            Save
        </div>
        <div className="btn btn-primary">
            Preview
        </div>

        <ul>
            {widgets.map(widget => <WidgetComponent key={widget.id} widget={widget}/>)}
        </ul>

        <AddWidgetComponent />
    </div>
    );


const stateToPropertiesMapper = state => ({
    widgets: state.widgets
});

const dispatcherToPropsMapper = dispatch => ({

});

const WidgetList = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetListComponent);

const App = () => (
    <div>
        <WidgetList/>
    </div>
);

export default App
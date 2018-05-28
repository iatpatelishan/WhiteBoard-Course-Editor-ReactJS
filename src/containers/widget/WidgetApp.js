import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions"
import WidgetComponent from '../../components/Widget';
import AddWidgetComponent from '../../components/AddWidget';


const WidgetListComponent = ({widgets}) => (
    <div className="wbdv-widget-editor">
        <button type="button" className="btn btn-primary float-right wbdv-wdgt-save">
            Preview
        </button>
        <button type="button" className="btn btn-success float-right wbdv-wdgt-save">
            <i className="fa fa-save"></i>            Save
        </button>
        <div className="clearfix"></div>

        {widgets.map(widget => <WidgetComponent key={widget.id} widget={widget}/>)}

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
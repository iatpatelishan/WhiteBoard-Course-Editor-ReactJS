import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"

const AddWidget = ({addWidget}) => {
    return (
        <div>
            <button type="button" className="btn btn-danger float-right wbdv-margin-top-20" onClick={addWidget}><i className="fa fa-plus-circle"></i>
            </button>
        </div>
    )
};

const stateToPropertiesMapper = state => ({
    widgets: state.widgets
});

const dispatcherToPropsMapper = dispatch => ({
    addWidget: () => actions.addWidget(dispatch)
});

const AddWidgetComponent = connect(null, dispatcherToPropsMapper)(AddWidget);
export default AddWidgetComponent


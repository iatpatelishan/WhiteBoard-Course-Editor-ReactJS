import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"
import lastWidgetType from "../reducers/lastWidgetType";

const AddWidget = ({addWidget, lastWidgetType}) => {
    return (
        <div>
            <button type="button" className="btn btn-danger float-right wbdv-margin-top-20" onClick={() => addWidget(lastWidgetType)}><i className="fa fa-plus-circle"></i>
            </button>
        </div>
    )
};

const stateToPropertiesMapper = state => ({
    lastWidgetType: state.lastWidgetType
});

const dispatcherToPropsMapper = dispatch => ({
    addWidget: (lastWidgetType) => actions.addWidget(dispatch, lastWidgetType)
});

const AddWidgetComponent = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(AddWidget);
export default AddWidgetComponent


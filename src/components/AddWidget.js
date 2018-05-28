import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"

const AddWidget = ({addWidget}) => {
    let input;
    return (
        <div>
            <input ref={node => input = node}/>
            <button type="submit" onClick={() => addWidget(input.value)}>Add Widget
            </button>
        </div>
    )
};

const stateToPropertiesMapper = state => ({
    widgets: state.widgets
});

const dispatcherToPropsMapper = dispatch => ({
    addWidget: (input) => actions.addWidget(dispatch,input)
});

const AddWidgetComponent = connect(null, dispatcherToPropsMapper)(AddWidget);
export default AddWidgetComponent


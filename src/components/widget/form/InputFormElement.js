import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../../actions";

const InputFormElement = ({}) => {
    return (
        <h1>Input Form Element</h1>
    )
};

const stateToPropsMapper = state => ({

});

const dispathToPropsMapper = dispatch => ({

});

const InputFormElementContainer = connect(stateToPropsMapper, dispathToPropsMapper)(InputFormElement);

export default InputFormElementContainer;
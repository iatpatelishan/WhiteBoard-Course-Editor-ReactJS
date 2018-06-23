import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../../actions";

const CheckboxFormElement = ({}) => {
    return (
        <h1>Checkbox Form Element</h1>
    )
};

const stateToPropsMapper = state => ({

});

const dispathToPropsMapper = dispatch => ({

});

const CheckboxFormElementContainer = connect(stateToPropsMapper, dispathToPropsMapper)(CheckboxFormElement);

export default CheckboxFormElementContainer;
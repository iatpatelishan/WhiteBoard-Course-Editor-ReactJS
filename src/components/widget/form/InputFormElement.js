import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../../actions";

const InputFormElement = ({widget, element, changeLabel, changeLabelDirection}) => {
    let labelElem ;
    let labelDirection;
    return (
        <div>
            <hr/>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Label Name</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           onChange={() => changeLabel(widget.id, element.id, labelElem.value)}
                           value={element.label}
                           ref={node => labelElem = node}
                           placeholder="Add Label Here" />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Label Direction</label>
                <div className="col-sm-10">
                    <select className="form-control" onChange={() => changeLabelDirection(widget.id, element.id, labelDirection.value)}
                            value={element.labelDirection}
                            ref={node => labelDirection = node}>
                        <option value="Horizontal">Horizontal</option>
                        <option value="Vertical">Vertical</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">CSS Style</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           placeholder="Add Widget Name Here"/>
                </div>
            </div>
        </div>
    )
};

const stateToPropsMapper = (state, ownProps) => ({
    widget: ownProps.widget,
    element: ownProps.element
});

const dispathToPropsMapper = dispatch => ({
    changeLabel: (widgetId, elementId, label) => actions.changeLabelFormElement(dispatch, widgetId, elementId, label),
    changeLabelDirection: (widgetId, elementId, labelDirection) => actions.changeLabelDirectionFormElement(dispatch, widgetId, elementId, labelDirection),
});

const InputFormElementContainer = connect(stateToPropsMapper, dispathToPropsMapper)(InputFormElement);

export default InputFormElementContainer;
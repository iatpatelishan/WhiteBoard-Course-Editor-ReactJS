import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../../actions";

const preventEditing = (event) => {
    if (event.ctrlKey) {
        if (event.keyCode === 67 || event.keyCode === 65) {
            return true;
        } else {
            event.preventDefault();
        }
    } else {
        event.preventDefault();
    }
};

const InputFormElement = ({topicId, widget, element, changeLabel, changeLabelDirection, changeCSS}) => {
    let labelElem;
    let labelDirection;
    let cssElem;
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
                           placeholder="Add Label Here"/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Label Direction</label>
                <div className="col-sm-10">
                    <select className="form-control"
                            onChange={() => changeLabelDirection(widget.id, element.id, labelDirection.value)}
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
                    <textarea className="form-control" onChange={() => changeCSS(widget.id, element.id, cssElem.value)}
                              value={widget.cssStyle}
                              ref={node => cssElem = node}
                              placeholder="Add CSS Style Here" rows="4"/>

                    <div>
                        Example CSS Styles :- <br/>
                        <pre className="wbdv-cursor" contentEditable="true" onKeyDown={(e) => preventEditing(e)}>
                    #{"T" + topicId + "Elem" + element.orderno + "Label"} {"{"} <br/>
                    color : #3498db; <br/>
                    text-decoration: underline; <br/>
                            {"}"}
                            <br/>
                    <br/>
                    #{"T" + topicId + "Elem" + element.orderno + "Input"} {"{"} <br/>
                    border: 2px solid red; <br/>
                            {"}"} <br/>
                </pre>
                    </div>
                </div>
            </div>


        </div>
    )
};

const stateToPropsMapper = (state, ownProps) => ({
    widget: ownProps.widget,
    element: ownProps.element,
    topicId: state.topicId,
});

const dispathToPropsMapper = dispatch => ({
    changeLabel: (widgetId, elementId, label) => actions.changeLabelFormElement(dispatch, widgetId, elementId, label),
    changeLabelDirection: (widgetId, elementId, labelDirection) => actions.changeLabelDirectionFormElement(dispatch, widgetId, elementId, labelDirection),
    changeCSS: (widgetId, elementId, cssStyle) => actions.changeCSSFormElement(dispatch, widgetId, elementId, cssStyle),
});

const InputFormElementContainer = connect(stateToPropsMapper, dispathToPropsMapper)(InputFormElement);

export default InputFormElementContainer;
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

const generateOptions = (topicId, widget, element, deleteElement, changeAnswer) => {
    if(element !==undefined && element.options !==null && element.options !== undefined) {
        return element.options.split('\n')
            .map((line, i) => {
                return (
                    <div className="form-check">
                        <input className="form-check-input" type="radio"
                               checked={element.answer === i}
                               name={"T" + topicId + "Elem" + element.orderno}
                               id={"T" + topicId + "Elem" + element.orderno + "Radio" + i + "Answer"}
                               key={i} label={line} value={line} onClick={() => changeAnswer(widget.id, element.id, i)} />
                            <label className="form-check-label" htmlFor={"T" + topicId + "Elem" + element.orderno + "Radio" + i + "Answer"}>
                                {line}
                            </label>
                    </div>);
            });
    } else {
        return [<p>Write Options above to get started!</p>];
    }
};

const RadioFormElement = ({topicId, widget, element, deleteElement, changeLabel, changeLabelDirection, changeCSS, changeOptions, changeAnswer}) => {
    let labelElem;
    let labelDirection;
    let cssElem;
    let optionsElem;
    let formList = generateOptions(topicId, widget, element, deleteElement, changeAnswer);


    return (
        <div>
            <hr/>
            <h4>
                Radio Element Editor
                <span className="btn btn-sm btn-danger float-right"
                      title="Delete Element" onClick={() => deleteElement(widget.id, element.id)}>
                    <i className="fa fa-times"></i>
                </span>
            </h4>
            <br/>

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
                              value={element.cssStyle}
                              ref={node => cssElem = node}
                              placeholder="Add CSS Style Here" rows="4"/>

                    <div>
                        Example CSS Styles :- <br/>
                        <pre className="wbdv-cursor" contentEditable="true" onKeyDown={(e) => preventEditing(e)}>
                            #{"T" + topicId + "Elem" + element.orderno + "Box"} {"{"} <br/>
                            color : #5f5f5f; <br/>
                            border-style: dotted; <br/>
                            {"}"}
                            <br/>
                            <br/>
                            #{"T" + topicId + "Elem" + element.orderno + "BoxOption0"} {"{"} <br/>
                            color : #3498db; <br/>
                            border-style: dashed; <br/>
                            {"}"}
                            <br/>
                            <br/>
                            #{"T" + topicId + "Elem" + element.orderno + "Label"} {"{"} <br/>
                            color : #3498db; <br/>
                            text-decoration: underline; <br/>
                            {"}"}
                            <br/>
                            <br/>
                            #{"T" + topicId + "Elem" + element.orderno + "Radio" + "0"} {"{"} <br/>
                            border: 2px solid red; <br/>
                            {"}"} <br/>
                </pre>
                    </div>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Options</label>
                <div className="col-sm-10">
                    <textarea className="form-control" onChange={() => changeOptions(widget.id, element.id, optionsElem.value)}
                              value={element.options}
                              ref={node => optionsElem = node}
                              placeholder="Add One Option per line" rows="4" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Correct Choice</label>
                <div className="col-sm-10">
                    {formList}
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
    deleteElement: (widgetId, elementId) => actions.deleteFormElement(dispatch, widgetId, elementId),
    changeLabel: (widgetId, elementId, label) => actions.changeLabelFormElement(dispatch, widgetId, elementId, label),
    changeLabelDirection: (widgetId, elementId, labelDirection) => actions.changeLabelDirectionFormElement(dispatch, widgetId, elementId, labelDirection),
    changeCSS: (widgetId, elementId, cssStyle) => actions.changeCSSFormElement(dispatch, widgetId, elementId, cssStyle),
    changeOptions: (widgetId, elementId, options) => actions.changeOptionsFormElement(dispatch, widgetId, elementId, options),
    changeAnswer: (widgetId, elementId, answer) => actions.changeAnswerFormElement(dispatch, widgetId, elementId, answer),
});

const RadioFormElementContainer = connect(stateToPropsMapper, dispathToPropsMapper)(RadioFormElement);

export default RadioFormElementContainer;
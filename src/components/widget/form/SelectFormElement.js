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

const generateOptions = (topicId, widget, element) => {
    if(element !==undefined && element.options !==null && element.options !== undefined) {
        let ansCount = -1;
        return element.options.split(/(?!\(.*)\n(?![^\[]*?\])/g)
            .map((spline, i) => {
                let elemNode;
                if (spline.substr(0, 1) == '[' && spline.slice(-1) == ']') {
                    let arr = spline.substr(1,spline.length-2).split('\n');
                    let label = arr[0];
                    arr.shift();
                    ansCount++;
                    arr = arr.map((item,index) => {
                        let elemNode2;
                        ansCount++;
                        return (<option value={ansCount}
                                        ref={node => elemNode2 = node}
                                        key={i}>
                                    {item}
                                </option>);
                    });
                    return (
                        <optgroup label={label}>
                            {arr}
                        </optgroup>
                    )
                } else {
                    ansCount++;
                    return (<option value={ansCount}
                                    ref={node => elemNode = node}
                                    key={ansCount}>
                                {spline}
                            </option>);
                }
            });
    } else {
        return [<p>Write Options above to get started!</p>];
    }
};

const SelectFormElement = ({topicId, widget, element, changeLabel, changeLabelDirection, changeCSS, changeOptions, changeAnswerListForSelect}) => {
        let labelElem;
        let labelDirection;
        let cssElem;
        let optionsElem;
        let formList = generateOptions(topicId, widget, element);
        let selectElem;

        return (
            <div>
                <hr/>
                <h4>Select Element Editor</h4>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Label Name</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               value={element.label}
                               ref={node => labelElem = node}
                               placeholder="Add Label Here"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Label Direction</label>
                    <div className="col-sm-10">
                        <select className="form-control"
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
                                <textarea className="form-control"
                                          onChange={() => changeCSS(widget.id, element.id, cssElem.value)}
                                          value={widget.cssStyle}
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
                                #{"T" + topicId + "Elem" + element.orderno + "Select" + "0"} {"{"} <br/>
                                border: 2px solid red; <br/>
                                {"}"} <br/>
                                </pre>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Options</label>
                    <div className="col-sm-10">
                                <textarea className="form-control"
                                          onChange={() => changeOptions(widget.id, element.id, optionsElem.value)}
                                          value={element.options}
                                          ref={node => optionsElem = node}
                                          placeholder="Add One Option per line" rows="4"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Correct Choice</label>
                    <div className="col-sm-10">
                        <select ref={node => selectElem = node}
                                value={element.answerList}
                                class="custom-select"
                                multiple
                                onChange={() => changeAnswerListForSelect(widget.id, element.id, selectElem)}>{formList}</select>
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
    changeOptions: (widgetId, elementId, options) => actions.changeOptionsFormElement(dispatch, widgetId, elementId, options),
    changeAnswerListForSelect: (widgetId, elementId, selectElem) => actions.changeAnswerListForSelectFormElement(dispatch, widgetId, elementId, selectElem),
});

const SelectFormElementContainer = connect(stateToPropsMapper,
    dispathToPropsMapper)(SelectFormElement);

export default SelectFormElementContainer;
import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"
import InputFormElementContainer from "../../components/widget/form/InputFormElement";
import CheckboxFormElementContainer from "../../components/widget/form/CheckboxFormElement";
import { UniversalStyle as Style } from 'react-css-component'


const GenerateCSS = ({widget}) => {

    let css = '';
    {widget.elements.map((elem,index) => {
        css += elem.cssStyle + ' ';
    })}
    return css;
}


const Form = ({widget, preview, widgetNameChanged, addFormElement}) => {
    let widgetNameElem;
    let addElementElem;
    let css = `${GenerateCSS({widget})}`;
    return (
        <div>
            <div style={{display: widget.editing ? 'block' : 'none'}} className="wbdv-single-widget-edit">

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Widget Name</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               onChange={() => widgetNameChanged(widget.id, widgetNameElem.value)}
                               value={widget.name}
                               ref={node => widgetNameElem = node}
                               placeholder="Add Widget Name Here"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Add Element</label>
                    <div className="col-sm-8">
                        <select className="form-control" ref={node => addElementElem = node}>
                            <option value="INPUT">Input</option>
                            <option value="CHECKBOX">Checkbox</option>
                            <option value="RADIO">Radio</option>
                            <option value="SELECT">Select / Dropdown</option>
                            <option value="TEXTAREA">Textarea</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-primary"
                                onClick={() => addFormElement(widget.id, addElementElem.value)}>
                            <i className="fa fa-wpforms"></i> Add Element
                        </button>
                    </div>
                </div>

                <div>
                    <h6>Elements :-</h6>
                    {widget.elements.map((element, index) => {
                        if (element.elementType === 'INPUT') {
                            return <InputFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'CHECKBOX') {
                            return <CheckboxFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'RADIO') {
                            return <InputFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'SELECT') {
                            return <InputFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'TEXTAREA') {
                            return <InputFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else {
                            return (<div>Unsupported Element</div>);
                        }
                    })}
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            <div>
                <Style css={css} />

                {widget.elements.map((element, index) => {
                    return (
                        <div key={index} className={"form-group " + (element.labelDirection === 'Horizontal' ? 'row' : '')}>
                            <label className="col-sm-2 col-form-label" id={"Form"+widget.id+"Elem"+element.id+"label"}>{element.label}</label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       onChange={() => widgetNameChanged(widget.id, widgetNameElem.value)}
                                       value={widget.name}
                                       ref={node => widgetNameElem = node}
                                       placeholder="Add Widget Name Here"
                                       id={"Form"+widget.id+"Elem"+element.id+"input"}
                                />
                            </div>

                        </div>
                    );
                }
                )}
            </div>
        </div>
    )
};

const dispathToPropsMapper = dispatch => ({
    widgetNameChanged: (widgetId, newText) => actions.widgetNameChanged(dispatch, widgetId, newText),
    addFormElement: (widgetId, elementType) => actions.addFormElement(dispatch, widgetId, elementType)
});

const stateToPropsMapper = state => ({})
const FormContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Form)

export default FormContainer

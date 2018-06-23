import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"

const Form = ({widget, preview, widgetNameChanged, addFormElement}) => {
    let widgetNameElem;
    let addElementElem;
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
                        <button className="btn btn-primary" onClick={() => addFormElement(widget.id, addElementElem)}><i
                            className="fa fa-wpforms"></i> Add Element
                        </button>
                    </div>
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            <p>{widget.text}</p>
        </div>
    )
}
const dispathToPropsMapper = dispatch => ({
    widgetNameChanged: (widgetId, newText) => actions.widgetNameChanged(dispatch, widgetId, newText),
    addFormElement: (widgetId, elementType) => actions.addFormElement(dispatch, widgetId, elementType)
})

const stateToPropsMapper = state => ({})
const FormContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Form)

export default FormContainer

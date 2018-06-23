import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"

const Form = ({widget, preview, widgetNameChanged, FormTextChanged}) => {
    let widgetNameElem
    let FormTextElem
    return(
        <div>
            <div style={{display: widget.editing ? 'block' : 'none'}} className="wbdv-single-widget-edit">

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Widget Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" onChange={() => widgetNameChanged(widget.id, widgetNameElem.value)}
                               value={widget.name}
                               ref={node => widgetNameElem = node}
                               placeholder="Add Widget Name Here"/>
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
})

const stateToPropsMapper = state => ({

})
const FormContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Form)

export default FormContainer

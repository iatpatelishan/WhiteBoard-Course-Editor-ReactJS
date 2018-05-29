import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"

const Paragraph = ({widget, preview, widgetNameChanged, paragraphTextChanged}) => {
    let widgetNameElem
    let paragraphTextElem
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

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Paragraph Text</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" onChange={() => paragraphTextChanged(widget.id, paragraphTextElem.value)}
                               value={widget.text}
                               ref={node => paragraphTextElem = node}
                               placeholder="Add Paragraph Text Here" rows="4" />
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
    paragraphTextChanged: (widgetId, newText) => actions.paragraphTextChanged(dispatch, widgetId, newText)
})

const stateToPropsMapper = state => ({

})
const ParagraphContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Paragraph)

export default ParagraphContainer

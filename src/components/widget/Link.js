import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"

const Link = ({widget, preview, widgetNameChanged, linkTextChanged, linkUrlChanged}) => {
    let widgetNameElem
    let linkTextElem
    let linkUrlElem
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
                    <label className="col-sm-2 col-form-label">Link Text</label>
                    <div className="col-sm-10">
                        <input className="form-control" onChange={() => linkTextChanged(widget.id, linkTextElem.value)}
                               value={widget.text}
                               ref={node => linkTextElem = node}
                               placeholder="Add Link Url Here"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Link URL</label>
                    <div className="col-sm-10">
                        <input className="form-control" onChange={() => linkUrlChanged(widget.id, linkUrlElem.value)}
                               value={widget.href}
                               ref={node => linkUrlElem = node}
                               placeholder="Add Link Url Here"/>
                    </div>
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            <a href={widget.href} target="_blank">{widget.text}</a>
        </div>
    )
}
const dispathToPropsMapper = dispatch => ({
    widgetNameChanged: (widgetId, newText) => actions.widgetNameChanged(dispatch, widgetId, newText),
    linkTextChanged: (widgetId, newText) => actions.linkTextChanged(dispatch, widgetId, newText),
    linkUrlChanged: (widgetId, newText) => actions.linkUrlChanged(dispatch, widgetId, newText)
})

const stateToPropsMapper = state => ({

})
const LinkContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Link)

export default LinkContainer

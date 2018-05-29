import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"

const Image = ({widget, preview, widgetNameChanged, imageUrlChanged}) => {
    let widgetNameElem
    let imageUrlElem
    return(
        <div>
            <div hidden={preview} className="wbdv-single-widget-edit">

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
                    <label className="col-sm-2 col-form-label">Image URL</label>
                    <div className="col-sm-10">
                        <input className="form-control" onChange={() => imageUrlChanged(widget.id, imageUrlElem.value)}
                               value={widget.src}
                               ref={node => imageUrlElem = node}
                               placeholder="Add Image Url Here"/>
                    </div>
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            <img src={widget.href} alt=""/>
        </div>
    )
}
const dispathToPropsMapper = dispatch => ({
    widgetNameChanged: (widgetId, newText) => actions.widgetNameChanged(dispatch, widgetId, newText),
    imageUrlChanged: (widgetId, newText) => actions.imageUrlChanged(dispatch, widgetId, newText)
})

const stateToPropsMapper = state => ({

})
const ImageContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Image)

export default ImageContainer

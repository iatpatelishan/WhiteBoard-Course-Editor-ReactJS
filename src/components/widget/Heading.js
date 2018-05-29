import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"

const Heading = ({widget, preview, headingTextChanged, headingSizeChanged}) => {
    let selectElem
    let inputElem
    return(
        <div>
            <div hidden={preview} className="wbdv-single-widget-edit">

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Heading Text</label>
                    <div className="col-sm-10">
                        <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                               value={widget.text}
                               ref={node => inputElem = node}
                                placeholder="Add Heading Text Here"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Text Size</label>
                    <div className="col-sm-10">
                        <select className="form-control" onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                                value={widget.size}
                                ref={node => selectElem = node}>
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                        </select>
                    </div>
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}
const dispathToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
})

const stateToPropsMapper = state => ({

})
const HeadingContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Heading)

export default HeadingContainer

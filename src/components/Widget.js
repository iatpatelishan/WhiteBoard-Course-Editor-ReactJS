import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"

export const Widget = ({widget, moveUp, deleteWidget, setWidgetType, toggleEditing}) => {
    let select;
    let editing;
    return (
        <div className="row">
            {widget.text} {widget.id}

            <span className="btn btn-primary" onClick={() => (moveUp(widget))}> ^ </span>

            <span className="btn btn-primary" onClick={e => deleteWidget(widget.id)}> Delete </span>

            <select ref={node => select = node}
                    value={widget.widgetType}
                    onChange={e => setWidgetType(widget.id, select.value)}>
                <option>Heading</option>
                <option>Paragraph</option>
                <option>HTML</option>
                <option>Link</option>
                <option>iFrame</option>
            </select>

            <label>
                <input ref={node => editing = node}
                       type="checkbox"
                       onChange={e => toggleEditing(widget.id, editing.checked)}
                       checked={widget.editing}/> Editing
            </label>

            <div style={{display: widget.editing ? 'block' : 'none'}}>
                <div style={{
                    display: widget.widgetType
                    === 'Heading' ? 'block' : 'none'
                }}>
                    Heading
                </div>
                <div style={{
                    display: widget.widgetType
                    === 'Paragraph' ? 'block' : 'none'
                }}>
                    Paragraph
                </div>


            </div>
        </div>
    )
}

const dispatcherToPropsMapper = (dispatch) => ({
    toggleEditing : (id, checked) => actions.toggleEditing(dispatch, id, checked),
    deleteWidget: (id) => actions.deleteWidget(dispatch, id),
    moveUp: (id) => actions.moveUp(dispatch, id),
    setWidgetType: (id, widgetType) => actions.setWidgetType(dispatch, id, widgetType)
})

const WidgetComponent = connect(null,dispatcherToPropsMapper)(Widget)
export default WidgetComponent




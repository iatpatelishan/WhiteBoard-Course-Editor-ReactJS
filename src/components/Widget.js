import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"

export const Widget = ({widget, dispatch}) => {
    let select;
    let editing;
    return (
        <li>{widget.text}

            <span className="btn btn-primary" onClick={() => { dispatch(moveUp(widget)) }}> ^ </span>

            <span className="btn btn-primary" onClick={e => { dispatch(deleteWidget(widget.id)) }}> Delete </span>

            <select ref={node => select = node}
                    value={widget.widgetType}
                    onChange={e => {
                        dispatch(setWidgetType(widget.id, select.value))
                    }}>
                <option>Heading</option>
                <option>Paragraph</option>
                <option>HTML</option>
                <option>Link</option>
                <option>iFrame</option>
            </select>

            <label>
                <input ref={node => editing = node}
                       type="checkbox"
                       onChange={e => {
                           dispatch(toggleEditing
                           (widget.id, editing.checked))
                       }}
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
        </li>
    )
}
const WidgetComponent = connect()(Widget)
export default WidgetComponent

const RawTextWidgetComponent = ({widget, dispatch}) => {
    let preview;
    let textarea;
    return (
        <div>
            <h1>Raw Text Widget</h1>
            <textarea ref={node => textarea = node}
                      value={widget.rawtext}
                      onChange={e => {
                          dispatch(setTextWidget(widget.id,
                              textarea.value))
                          preview.innerHTML = textarea.value
                      }}></textarea>
            <p ref={node => preview = node}></p>
        </div>

    )
}
const RawTextWidget = connect()
(RawTextWidgetComponent)

const setTextWidget = (id, text) => (
    {type: 'SET_TEXT_WIDGET', id: id, text: text})


const toggleEditing = (id, checked) => {
    return {
        type: 'TOGGLE_EDITING',
        id: id,
        editing: checked
    }
}


const setWidgetType = (id, widgetType) => {
    return {
        type: 'SET_WIDGET_TYPE',
        widgetType: widgetType, id: id
    }
}


const deleteWidget = id => {
    return {
        type: 'DELETE_WIDGET', id: id
    }
};

const moveUp = widget => {
    return {
        type: 'MOVE_UP', widget: widget
    }
}
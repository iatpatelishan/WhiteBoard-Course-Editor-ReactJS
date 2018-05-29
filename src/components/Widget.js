import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"
import HeadingContainer from "./widget/Heading"
import Image from "./widget/Image"
import Link from "./widget/Link"
import List from "./widget/List"
import Paragraph from "./widget/Paragraph"




export const Widget = ({widget, moveUp, deleteWidget, cloneWidget, setWidgetType, toggleEditing}) => {
    let select;
    let editing;
    return (
        <div className="card wbdv-margin-top-10">
            <div className="card-body wbdv-margin-left-right-20">
                <div className="row wbdv-display-block">
                    <div className="float-left">
                        <h2>{widget.widgetType} {widget.id}</h2>
                    </div>
                    <div>
                        <span className="btn btn-danger wbdv-wdgt-btn float-right" onClick={e => deleteWidget(widget.id)}> <i className="fa fa-times"></i> </span>



                        <span className="btn btn-light wbdv-wdgt-btn float-right" onClick={() => cloneWidget(widget)}> <i className="fa fa-clone"></i> </span>

                        <select  className="form-control form-inline wbdv-wdgt-btn float-right wbdv-widget-select" ref={node => select = node}
                                 value={widget.widgetType}
                                 onChange={e => setWidgetType(widget.id, select.value)}>
                            <option>Heading</option>
                            <option>Image</option>
                            <option>Link</option>
                            <option>List</option>
                            <option>Paragraph</option>
                        </select>

                        <span className="btn btn-warning wbdv-wdgt-btn float-right" onClick={() => (moveUp(widget))}> <i className="fa fa-chevron-up"></i> </span>
                        <span className="btn btn-warning wbdv-wdgt-btn float-right" onClick={() => (moveUp(widget))}> <i className="fa fa-chevron-down"></i> </span>
                    </div>
                </div>

                <div className="row wbdv-display-block">
                    {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                    {widget.widgetType==='Image' && <Image/>}
                    {widget.widgetType==='Link' && <Link/>}
                    {widget.widgetType==='List' && <List/>}
                    {widget.widgetType==='Paragraph' && <Paragraph/>}
                </div>




    {/*            <label>
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


                </div>*/}
            </div>
        </div>
    )
}

const dispatcherToPropsMapper = (dispatch) => ({
    toggleEditing: (id, checked) => actions.toggleEditing(dispatch, id, checked),
    deleteWidget: (id) => actions.deleteWidget(dispatch, id),
    cloneWidget: (widget) => actions.cloneWidget(dispatch, widget),
    moveUp: (id) => actions.moveUp(dispatch, id),
    setWidgetType: (id, widgetType) => actions.setWidgetType(dispatch, id, widgetType)
})

const WidgetComponent = connect(null, dispatcherToPropsMapper)(Widget)
export default WidgetComponent




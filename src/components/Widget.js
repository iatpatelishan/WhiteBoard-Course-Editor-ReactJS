import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"
import HeadingContainer from "./widget/Heading"
import Image from "./widget/Image"
import Link from "./widget/Link"
import List from "./widget/List"
import Paragraph from "./widget/Paragraph"




export const Widget = ({widget, moveUp, deleteWidget, cloneWidget, setWidgetType, enableEditing, toggleEditing, preview}) => {
    let select;
    let editing;
    return (
        <div className="card wbdv-margin-top-10">
            <div className="card-body wbdv-margin-left-right-20" onClick={e => {if(preview){enableEditing(widget.id)}}}>
                <div className="row wbdv-display-block">
                    <div style={{display: widget.editing ? 'block' : 'none'}}>
                        <span className="btn btn-danger wbdv-wdgt-btn float-right" onClick={e => deleteWidget(widget.id)} title="Delete Widget"> <i className="fa fa-times"></i> </span>



                        <span className="btn btn-light wbdv-wdgt-btn float-right" onClick={() => cloneWidget(widget)} title="Clone Widget"> <i className="fa fa-clone"></i> </span>

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
                        <h3>{widget.widgetType} Widget</h3>
                    </div>



                </div>

                <div className="row wbdv-display-block">
                    {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                    {widget.widgetType==='Image' && <Image widget={widget}/>}
                    {widget.widgetType==='Link' && <Link widget={widget}/>}
                    {widget.widgetType==='List' && <List widget={widget}/>}
                    {widget.widgetType==='Paragraph' && <Paragraph widget={widget}/>}
                </div>




            </div>
        </div>
    )
}

const stateToPropertiesMapper = (state) => ({
    preview: state.preview
});

const dispatcherToPropsMapper = (dispatch) => ({
    enableEditing: (id) => actions.enableEditing(dispatch, id),
    toggleEditing: (id) => actions.toggleEditing(dispatch, id),
    deleteWidget: (id) => actions.deleteWidget(dispatch, id),
    cloneWidget: (widget) => actions.cloneWidget(dispatch, widget),
    moveUp: (id) => actions.moveUp(dispatch, id),
    setWidgetType: (id, widgetType) => actions.setWidgetType(dispatch, id, widgetType)
})

const WidgetComponent = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(Widget)
export default WidgetComponent




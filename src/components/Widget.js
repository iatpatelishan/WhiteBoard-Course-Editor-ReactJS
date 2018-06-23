import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions"
import HeadingContainer from "./widget/Heading"
import Image from "./widget/Image"
import Link from "./widget/Link"
import List from "./widget/List"
import Paragraph from "./widget/Paragraph"
import FormContainer from "../containers/widget/FormWidget";




export const Widget = ({widgetIndex, widget, maxWidgetIndex, moveUp, moveDown,deleteWidget, cloneWidget, setWidgetType, enableEditing, toggleEditing, preview}) => {
    let select;
    let editing;
    let upbutton=true;
    let downbutton=true;
    if(widgetIndex == '0'){
        upbutton=false;
    }
    if(widgetIndex == maxWidgetIndex){
        downbutton=false;
    }

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
                            <option>Form</option>
                        </select>

                        <span style={{display: downbutton ? 'block' : 'none'}} className="btn btn-warning wbdv-wdgt-btn float-right" onClick={() => (moveDown(widget))}> <i className="fa fa-chevron-down"></i> </span>
                        <span style={{display: upbutton ? 'block' : 'none'}} className="btn btn-warning wbdv-wdgt-btn float-right" onClick={() => (moveUp(widget))}> <i className="fa fa-chevron-up"></i> </span>

                        <h3>{widget.widgetType} Widget</h3>
                    </div>



                </div>

                <div className="row wbdv-display-block">
                    {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                    {widget.widgetType==='Image' && <Image widget={widget}/>}
                    {widget.widgetType==='Link' && <Link widget={widget}/>}
                    {widget.widgetType==='List' && <List widget={widget}/>}
                    {widget.widgetType==='Paragraph' && <Paragraph widget={widget}/>}
                    {widget.widgetType==='Form' && <FormContainer widget={widget}/>}
                </div>




            </div>
        </div>
    )
}

const stateToPropertiesMapper = (state) => ({
    preview: state.preview,
    maxWidgetIndex: (state.widgets.length-1)
});

const dispatcherToPropsMapper = (dispatch) => ({
    enableEditing: (id) => actions.enableEditing(dispatch, id),
    toggleEditing: (id) => actions.toggleEditing(dispatch, id),
    deleteWidget: (id) => actions.deleteWidget(dispatch, id),
    cloneWidget: (widget) => actions.cloneWidget(dispatch, widget),
    moveUp: (id) => actions.moveUp(dispatch, id),
    moveDown: (id) => actions.moveDown(dispatch, id),
    setWidgetType: (id, widgetType) => actions.setWidgetType(dispatch, id, widgetType)
})

const WidgetComponent = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(Widget)
export default WidgetComponent




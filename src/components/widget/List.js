import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"

const TextToList = ({text}) => {
    let array = text.split('\n');
    let list = array.map(line => { return (<li>{line}</li>)});
    return list;
}

const List = ({widget, preview, widgetNameChanged, listItemsChanged, listTypeChanged}) => {
    let widgetNameElem
    let listItemsElem
    let listTypeElem
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
                    <label className="col-sm-2 col-form-label">List Items</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" onChange={() => listItemsChanged(widget.id, listItemsElem.value)}
                               ref={node => listItemsElem = node}
                                  placeholder="Add List Items Here. One item per line." value={widget.listItems} />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">List Type</label>
                    <div className="col-sm-10">
                        <select className="form-control" onChange={() => listTypeChanged(widget.id, listTypeElem.value)}
                                value={widget.listType}
                                ref={node => listTypeElem = node}>
                            <option value="UNORDERED">Unordered List</option>
                            <option value="ORDERED">Ordered List</option>
                        </select>
                    </div>
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            {widget.listType == 'UNORDERED' && <ul><TextToList text={widget.listItems} /></ul>}
            {widget.listType == 'ORDERED' && <ol><TextToList text={widget.listItems} /></ol>}
        </div>
    )
}
const dispathToPropsMapper = dispatch => ({
    widgetNameChanged: (widgetId, newText) => actions.widgetNameChanged(dispatch, widgetId, newText),
    listItemsChanged: (widgetId, newText) => actions.listItemsChanged(dispatch, widgetId, newText),
    listTypeChanged: (widgetId, newSize) => actions.listTypeChanged(dispatch, widgetId, newSize)
})

const stateToPropsMapper = state => ({

})
const ListContainer = connect(stateToPropsMapper, dispathToPropsMapper)(List)

export default ListContainer
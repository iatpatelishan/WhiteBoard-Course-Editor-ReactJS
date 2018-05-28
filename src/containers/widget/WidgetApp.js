import React, {Component} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const App = () => (
    <div>
        <WidgetList/>
        <AddWidget/>
    </div>
);


const mapStateToProps = state => ({
    widgets: state.widgets
});

const WidgetListComponent = ({widgets}) => (
    <ul>
        {widgets.map(widget =>
            <Widget key={widget.id}
                    widget={widget}/>
        )}</ul>);
const WidgetList = connect(mapStateToProps)(WidgetListComponent);


const WidgetComponent
    = ({widget, dispatch}) => {
    let select;
    return(
        <li>{widget.text}

            <button onClick={() => {
                dispatch(moveUp(widget))
            }}>^</button>

            <button onClick={e => {
                dispatch(deleteWidget(widget.id))
            }}>
                Delete
            </button>

            <select ref={node => select = node}
                    value={widget.widgetType}
                    onChange={e => {
                        dispatch(setWidgetType(widget.id, select.value))
                    }}>
                <option>Heading</option><option>Paragraph</option>
                <option>HTML</option><option>Link</option>
                <option>iFrame</option>
            </select>

            
        </li>
    )
}
const Widget = connect()(WidgetComponent)

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


let nextWidgetId = 0;
const AddWidgetComponent = ({dispatch}) => {
    let input;
    return (
        <div>
            <input ref={node => input = node}/>
            <button type="submit" onClick={e => {
                dispatch(addWidget(input.value))
            }}>Add Widget
            </button>
        </div>
    )
};
const AddWidget = connect(mapStateToProps)(AddWidgetComponent);

const addWidget = text => {
    return {
        type: 'ADD_WIDGET',
        id: nextWidgetId++,
        text: text
    }
}


const moveUp = widget => {
    return {
        type: 'MOVE_UP', widget: widget
    }
}


export default App
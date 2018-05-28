import React, {Component} from "react";
import {connect} from "react-redux";


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
    = ({widget, dispatch}) => (
    <li>{widget.text}
        <button onClick={e => {
            dispatch(deleteWidget(widget.id))
        }}>
            Delete
        </button>
    </li>)
const Widget = connect()(WidgetComponent)


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


export default App
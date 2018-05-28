import React, {Component} from "react";
import {connect} from "react-redux";


const App = () => (
    <div>
        <WidgetList widgets={[{text: 'Heading'}, {text: 'List'}]}/>
    </div>
);




const WidgetListComponent = ({ widgets }) => (
    <ul>
        {widgets.map(widget =>
            <Widget key={widget.id}
                    widget={widget}/>
        )}</ul>);
const WidgetList = connect()(WidgetListComponent);


const WidgetComponent
    = ({ widget, deleteWidget, dispatch}) => (
    <li>{widget.text}
        <button onClick={e => {
            dispatch({type: 'DELETE_WIDGET',
                id: widget.id})}}>
            Delete</button></li>)
const Widget = connect()(WidgetComponent)







export default App
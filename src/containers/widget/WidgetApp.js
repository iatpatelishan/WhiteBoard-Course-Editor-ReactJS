import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions"
import WidgetComponent from '../../components/Widget';
import AddWidgetComponent from '../../components/AddWidget';
import swal from "sweetalert";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {StyleCacheProvider} from 'react-css-component'


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',


    // change background colour if dragging
    background: isDragging ? 'white' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'white' : 'white',
    padding: grid,
});


class WidgetListComponent extends Component {

    constructor(props) {
        super(props)
        this.onDragEnd = this.onDragEnd.bind(this);
        this.props.findAllWidgets(this.props.topicId)
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const widgets = reorder(
            [...this.props.widgets],
            result.source.index,
            result.destination.index
        );

        this.props.saveWidgets(widgets);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.topicId !== newProps.topicIdFromTopicEditor) {
            document.addEventListener("keydown", function (e) {
                if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                    e.preventDefault();
                    newProps.save(newProps.topicIdFromTopicEditor);
                }
            }, false);
            newProps.findAllWidgets(newProps.topicIdFromTopicEditor);
        }
    }

    componentDidMount() {

    }

    render() {
        let previewElem;
        return (
            <div className="wbdv-widget-editor wbdv-overflow-hidden">
                <label title="Preview Mode" className="float-right switch wbdv-wdgt-save"
                       onClick={() => this.props.togglePreview(previewElem.checked)}>
                    <input onChange={() => {
                    }} type="checkbox" checked={this.props.preview} ref={node => previewElem = node}/>
                    <span className="slider round"></span>
                </label>
                <button type="button" className="btn btn-success float-right wbdv-wdgt-save"
                        onClick={() => this.props.save(this.props.topicId)}>
                    <i className="fa fa-save"></i> Save (Ctrl+S)
                </button>
                <div className="clearfix"></div>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.props.widgets.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <StyleCacheProvider>
                                                <WidgetComponent widgetIndex={index} key={item.id} widget={item} />
                                                </StyleCacheProvider>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {/*{this.props.widgets.map(widget => <WidgetComponent key={widget.id} widget={widget}/>)}*/}

                <AddWidgetComponent/>
            </div>
        )
    };
}

const stateToPropertiesMapper = (state, ownProps) => ({
    widgets: state.widgets,
    topicId: state.topicId,
    preview: state.preview,
    topicIdFromTopicEditor: ownProps.topicId
});

const dispatcherToPropsMapper = dispatch => ({
    saveWidgets: (widgets) => actions.saveWidgets(dispatch, widgets),
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch, topicId),
    togglePreview: (preview) => actions.togglePreview(dispatch, preview),
    save: (topicId) => {
        swal({
            title: "Saved!",
            text: "Changes have been saved",
            type: "success",
            buttons: false,
            timer: 1000
        });
        return actions.save(dispatch, topicId)
    }
});

const WidgetList = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetListComponent);


export default WidgetList
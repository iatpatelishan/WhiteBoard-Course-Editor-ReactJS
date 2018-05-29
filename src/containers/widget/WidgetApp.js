import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions"
import WidgetComponent from '../../components/Widget';
import AddWidgetComponent from '../../components/AddWidget';
import swal from "sweetalert";

class WidgetListComponent extends Component {

    constructor(props){
        super(props)
        this.props.findAllWidgets(this.props.topicId)
    }

    componentWillReceiveProps(newProps) {
        if(newProps.topicId != newProps.topicIdFromTopicEditor){
            document.addEventListener("keydown", function(e) {
                if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                    e.preventDefault();
                    newProps.save(newProps.topicIdFromTopicEditor);
                }
            }, false);
            newProps.findAllWidgets(newProps.topicIdFromTopicEditor);
        }
    }

    componentDidMount(){

    }

    render() {
        let previewElem;
        return (
            <div className="wbdv-widget-editor wbdv-overflow-hidden">

                <label className="float-right switch wbdv-wdgt-save" onClick={() => this.props.togglePreview(previewElem.checked)}>
                    <input type="checkbox" checked={this.props.preview} ref={node => previewElem = node} />
                        <span className="slider round"></span>
                </label>
                <button type="button" className="btn btn-success float-right wbdv-wdgt-save" onClick={() => this.props.save(this.props.topicId)}>
                    <i className="fa fa-save"></i> Save (Ctrl+S)
                </button>
                <div className="clearfix"></div>

                {this.props.widgets.map(widget => <WidgetComponent key={widget.id} widget={widget}/>)}

                <AddWidgetComponent/>
            </div>
        )
    };
}

const stateToPropertiesMapper = (state, ownProps) => ({
    widgets: state.widgets,
    topicId: state.topicId,
    preview: state.preview,
    topicIdFromTopicEditor : ownProps.topicId
});

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch,topicId),
    togglePreview: (preview) => actions.togglePreview(dispatch, preview),
    save: (topicId) => {
        swal({
           title:"Saved!",
            text:"Changes have been saved",
            type:"success",
            buttons: false,
            timer: 1000});
        return actions.save(dispatch,topicId)}
});

const WidgetList = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetListComponent);



export default WidgetList
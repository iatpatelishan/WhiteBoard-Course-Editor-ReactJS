import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions"
import WidgetComponent from '../../components/Widget';
import AddWidgetComponent from '../../components/AddWidget';


class WidgetListComponent extends Component {

    constructor(props){
        super(props)
        this.props.findAllWidgets(this.props.topicId)
    }

    componentWillReceiveProps(newProps) {
        if(newProps.topicId != newProps.topicIdFromTopicEditor){
            newProps.findAllWidgets(newProps.topicIdFromTopicEditor);
        }
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className="wbdv-widget-editor">{this.props.topicId}
                <button type="button" className="btn btn-primary float-right wbdv-wdgt-save">
                    Preview
                </button>
                <button type="button" className="btn btn-success float-right wbdv-wdgt-save" onClick={() => this.props.save(this.props.topicId)}>
                    <i className="fa fa-save"></i> Save
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
    topicIdFromTopicEditor : ownProps.topicId
});

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch,topicId),
    save: (topicId) => actions.save(dispatch,topicId)
});

const WidgetList = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetListComponent);



export default WidgetList
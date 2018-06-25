import {connect} from "react-redux";
import React, {Component} from "react";
import * as actions from "../../actions/index"
import InputFormElementContainer from "../../components/widget/form/InputFormElement";
import RadioFormElementContainer from "../../components/widget/form/RadioFormElement";
import CheckboxFormElementContainer from "../../components/widget/form/CheckboxFormElement";
import SelectFormElementContainer from "../../components/widget/form/SelectFormElement";
import TextareaFormElementContainer from "../../components/widget/form/TextareaFormElement";
import {UniversalStyle as Style} from 'react-css-component'
import topicId from "../../reducers/topicId";


const GenerateCSS = ({widget}) => {

    let css = '';
    if (widget.elements !== undefined) {
        {
            widget.elements.map((elem, index) => {
                css += elem.cssStyle + ' ';
            })
        }
    }
    return css;
};


const generateCheckboxPreviewOptions = (topicId, element) => {
    if (element !== undefined && element.options !== null && element.options !== undefined) {
        return element.options.split('\n')
            .map((line, i) => {
                return (
                    <div className="form-check" id={"T" + topicId + "Elem" + element.orderno + "BoxOption" + i}>
                        <input className="form-check-input" type="checkbox"
                               name={"T" + topicId + "Elem" + element.orderno}
                               id={"T" + topicId + "Elem" + element.orderno + "Checkbox" + i}
                               key={i} label={line} value={line}/>
                        <label className="form-check-label"
                               id={"T" + topicId + "Elem" + element.orderno + "Checkbox" + i + "Label"}
                               htmlFor={"T" + topicId + "Elem" + element.orderno + "Checkbox" + i}>
                            {line}
                        </label>
                    </div>);
            });
    } else {
        return [<p>Write Options above to get started!</p>];
    }
};


const generateRadioPreviewOptions = (topicId, element) => {
    if (element !== undefined && element.options !== null && element.options !== undefined) {
        return element.options.split('\n')
            .map((line, i) => {
                return (
                    <div className="form-check" id={"T" + topicId + "Elem" + element.orderno + "BoxOption" + i}>
                        <input className="form-check-input" type="radio"
                               name={"T" + topicId + "Elem" + element.orderno}
                               id={"T" + topicId + "Elem" + element.orderno + "Radio" + i}
                               key={i} label={line} value={line}/>
                        <label className="form-check-label"
                               id={"T" + topicId + "Elem" + element.orderno + "Radio" + i + "Label"}
                               htmlFor={"T" + topicId + "Elem" + element.orderno + "Radio" + i}>
                            {line}
                        </label>
                    </div>);
            });
    } else {
        return [<p>Write Options above to get started!</p>];
    }
};

const generateSelectPreviewOptions = (topicId, element) => {
    if(element !==undefined && element.options !==null && element.options !== undefined) {
        let ansCount = -1;
        return element.options.split(/(?!\(.*)\n(?![^\[]*?\])/g)
            .map((spline, i) => {
                let elemNode;
                if (spline.substr(0, 1) == '[' && spline.slice(-1) == ']') {
                    let arr = spline.substr(1,spline.length-2).split('\n');
                    let label = arr[0];
                    arr.shift();
                    ansCount++;
                    arr = arr.map((item,index) => {
                        let elemNode2;
                        ansCount++;
                        return (<option value={ansCount}
                                        ref={node => elemNode2 = node}
                                        key={i}>
                            {item}
                        </option>);
                    });
                    return (
                        <optgroup label={label}>
                            {arr}
                        </optgroup>
                    )
                } else {
                    ansCount++;
                    return (<option value={ansCount}
                                    ref={node => elemNode = node}
                                    key={ansCount}>
                        {spline}
                    </option>);
                }
            });
    } else {
        return [<p>Write Options above to get started!</p>];
    }
};


const Form = ({topicId, widget, preview, widgetNameChanged, addFormElement}) => {
    if(widget.elements == undefined) {
        widget.elements = [];
    }
    let widgetNameElem;
    let addElementElem;
    let css = `${GenerateCSS({widget})}`;
    return (
        <div>
            <div style={{display: widget.editing ? 'block' : 'none'}} className="wbdv-single-widget-edit">

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Widget Name</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               onChange={() => widgetNameChanged(widget.id, widgetNameElem.value)}
                               value={widget.name}
                               ref={node => widgetNameElem = node}
                               placeholder="Add Widget Name Here"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Add Element</label>
                    <div className="col-sm-8">
                        <select className="form-control" ref={node => addElementElem = node}>
                            <option value="INPUT">Input</option>
                            <option value="CHECKBOX">Checkbox</option>
                            <option value="RADIO">Radio</option>
                            <option value="SELECT">Select / Dropdown</option>
                            <option value="TEXTAREA">Textarea</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-primary"
                                onClick={() => addFormElement(widget.id, addElementElem.value)}>
                            <i className="fa fa-wpforms"></i> Add Element
                        </button>
                    </div>
                </div>

                <div>
                    <h6>Elements :-</h6>
                    {widget.elements.map((element, index) => {
                        if (element.elementType === 'INPUT') {
                            return <InputFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'CHECKBOX') {
                            return <CheckboxFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'RADIO') {
                            return <RadioFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'SELECT') {
                            return <SelectFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else if (element.elementType === 'TEXTAREA') {
                            return <TextareaFormElementContainer key={element.id} widget={widget} element={element}/>;
                        } else {
                            return (<div>Unsupported Element</div>);
                        }
                    })}
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            <div>
                <Style css={css}/>

                {widget.elements.map((element, index) => {
                        if (element.elementType === 'INPUT') {
                            return (
                                <div key={index}
                                     className={"form-group " + (element.labelDirection === 'Horizontal' ? 'row' : '')}
                                     id={"T" + topicId + "Elem" + element.orderno + "Box"}>
                                    <label className="col-sm-2 col-form-label"
                                           id={"T" + topicId + "Elem" + element.orderno + "Label"}>{element.label}</label>
                                    <div className="col-sm-10">
                                        <input className="form-control"
                                               placeholder="Add Input here"
                                               id={"T" + topicId + "Elem" + element.orderno + "Input"}
                                        />
                                    </div>
                                </div>
                            );
                        } else if (element.elementType === 'CHECKBOX') {
                            let previewOptions = generateCheckboxPreviewOptions(topicId, element);
                            return (
                                <div key={index}
                                     className={"form-group " + (element.labelDirection === 'Horizontal' ? 'row' : '')}
                                     id={"T" + topicId + "Elem" + element.orderno + "Box"}>
                                    <label className="col-sm-2 col-form-label"
                                           id={"T" + topicId + "Elem" + element.orderno + "Label"}>{element.label}</label>
                                    <div className="col-sm-10">
                                        {previewOptions}
                                    </div>
                                </div>
                            );
                        } else if (element.elementType === 'RADIO') {
                            let previewOptions = generateRadioPreviewOptions(topicId, element);
                            return (
                                <div key={index}
                                     className={"form-group " + (element.labelDirection === 'Horizontal' ? 'row' : '')}
                                     id={"T" + topicId + "Elem" + element.orderno + "Box"}>
                                    <label className="col-sm-2 col-form-label"
                                           id={"T" + topicId + "Elem" + element.orderno + "Label"}>{element.label}</label>
                                    <div className="col-sm-10">
                                        {previewOptions}
                                    </div>
                                </div>
                            );
                        } else if (element.elementType === 'SELECT') {
                            let previewOptions = generateSelectPreviewOptions(topicId, element);
                            return (
                                <div key={index}
                                     className={"form-group " + (element.labelDirection === 'Horizontal' ? 'row' : '')}
                                     id={"T" + topicId + "Elem" + element.orderno + "Box"}>
                                    <label className="col-sm-2 col-form-label"
                                           id={"T" + topicId + "Elem" + element.orderno + "Label"}>{element.label}</label>
                                    <div className="col-sm-10">
                                        <select className="custom-select"
                                                multiple
                                                >{previewOptions}</select>
                                    </div>
                                </div>
                            );
                        } else if (element.elementType === 'TEXTAREA') {
                            return (
                                <div key={index}
                                     className={"form-group " + (element.labelDirection === 'Horizontal' ? 'row' : '')}
                                     id={"T" + topicId + "Elem" + element.orderno + "Box"}>
                                    <label className="col-sm-2 col-form-label"
                                           id={"T" + topicId + "Elem" + element.orderno + "Label"}>{element.label}</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control"
                                               placeholder="Add Text here"
                                               id={"T" + topicId + "Elem" + element.orderno + "Textarea"}
                                        />
                                    </div>
                                </div>
                            );
                        }
                        else {
                            return (<p>Unsupported Element</p>);
                        }

                    }
                )}
            </div>
        </div>
    )
};

const dispathToPropsMapper = dispatch => ({
    widgetNameChanged: (widgetId, newText) => actions.widgetNameChanged(dispatch, widgetId, newText),
    addFormElement: (widgetId, elementType) => actions.addFormElement(dispatch, widgetId, elementType)
});

const stateToPropsMapper = (state, myProps) => ({
    topicId: state.topicId,
})
const FormContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Form)

export default FormContainer

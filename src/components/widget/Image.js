import {connect} from "react-redux";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import * as actions from "../../actions/index"
import swal from "sweetalert"



const GoogleImages = require('google-images');
const client = new GoogleImages('014376729306214753649:zypcswu7eek', 'AIzaSyBOvcvxAF86ZWERpO6dVVcQuZhvQZy9FNc');

const ImageList = ({imageList}) => {
    ReactDOM.render(imageList);
}

const Image = ({widget, preview, widgetNameChanged, imageUrlChanged, searchImage}) => {
    let widgetNameElem
    let imageUrlElem
    return(
        <div>
            <div style={{display: widget.editing ? 'block' : 'none'}} className="wbdv-single-widget-edit">

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
                    <label className="col-sm-2 col-form-label">Image URL</label>
                    <div className="col-sm-8">
                        <input className="form-control" onChange={() => imageUrlChanged(widget.id, imageUrlElem.value)}
                               value={widget.src}
                               ref={node => imageUrlElem = node}
                               placeholder="Add Image Url Here"/>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-info" onClick={() => searchImage(imageUrlElem)}>Search Images</button>
                    </div>
                </div>


                <hr/>
                <h3>Preview</h3>
            </div>
            <img src={widget.src} alt=""/>
        </div>
    )
}

const searchImage = (imageUrlNode) => {
    swal({
        text: 'Search for Images. e.g. "Jose Annunziato".',
        content: "input",
        button: {
            text: "Search!",
            closeModal: false,
        },
    })
        .then(name => {
            if (!name) throw null;
            return client.search(name)
        })
        .then(images => {

            let imagehtml = '';
            let imagelist = images.map(image => {
                imagehtml += "<img src='"+image.thumbnail.url+"' style='max-height:200px; max-width:200px'" +
                "  />";
            })


            var el = document.createElement("span");
            el.onclick = (e) => {alert(imageUrlNode.value);};
            el.innerHTML = imagehtml;

            swal({
                title: 'Select Image',
                type: "info",
                button: false,
                content: el
            })
        })
        .catch(err => {
            if (err) {
                swal("Oh noes!", "The AJAX request failed!", "error");
            } else {
                swal.stopLoading();
                swal.close();
            }
        });
}

const dispathToPropsMapper = dispatch => ({
    widgetNameChanged: (widgetId, newText) => actions.widgetNameChanged(dispatch, widgetId, newText),
    imageUrlChanged: (widgetId, newText) => actions.imageUrlChanged(dispatch, widgetId, newText),
    searchImage: () => searchImage(dispatch)
})

const stateToPropsMapper = state => ({

})
const ImageContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Image)

export default ImageContainer

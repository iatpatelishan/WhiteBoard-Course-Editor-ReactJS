import {connect} from "react-redux";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import * as actions from "../../actions/index"
import swal from "sweetalert"
import store from "../../store/courseEditor"
import {Provider} from "react-redux";


const GoogleImages = require('google-images');
const client = new GoogleImages('014376729306214753649:zypcswu7eek', 'AIzaSyBOvcvxAF86ZWERpO6dVVcQuZhvQZy9FNc');

const SearchedImage = ({images, widgetid, imageUrlChanged}) => {
    return images.map(image => {
        return (
            <div className="card">
                <div className="card-body">
                    <img src={image.url} style={{height: "100%", width: "100%"}}
                         onClick={() => {
                             imageUrlChanged(widgetid, image.url);
                             swal.close();
                         }}/>
                </div>
            </div>
        )
    })

}
const SearchedImageContainer = connect((state, myProps) => ({
    myimages: myProps.images
}), (dispatch) => ({
    imageUrlChanged: (widgetId, newText) => actions.imageUrlChanged(dispatch, widgetId, newText)
}))(SearchedImage);

const Image = ({widget, preview, widgetNameChanged, imageUrlChanged, searchImage}) => {
    let widgetNameElem
    let imageUrlElem
    let imageSearchElem
    let imageSearchResultElem
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
                    <label className="col-sm-2 col-form-label">Image URL</label>
                    <div className="col-sm-8">
                        <input className="form-control" onChange={() => imageUrlChanged(widget.id, imageUrlElem.value)}
                               value={widget.src}
                               ref={node => imageUrlElem = node}
                               placeholder="Add Image Url Here"/>
                    </div>
                    <button className="btn btn-info"
                            onClick={() => searchImage(imageSearchResultElem, widget.id, imageUrlChanged)}>Search
                        Images
                    </button>
                </div>

                <hr/>
                <h3>Preview</h3>
            </div>
            <img src={widget.src} alt="" className="wbdv-image-preview" />
        </div>
    )
}

const searchImage = (dispatch, imageSearchResultElem, widgetid, imageUrlChanged) => {

        swal({
            text: 'Search for Images. e.g. "Puppy".',
            content: "input",
            button: {
                text: "Search!",
                closeModal: false,
            },
        })
        .then(name => {
            if (!name) throw null;
            return client.search(name);
        })
        .then(images => {
            let wrapper = document.createElement('div');
            wrapper.className='card-columns'
            ReactDOM.render(
                <Provider store={store}>
                    <SearchedImageContainer key={images.length} widgetid={widgetid} images={images}
                                            imageUrlChanged={imageUrlChanged}>{images}</SearchedImageContainer>
                </Provider>, wrapper);

            swal({
                text: "Click to select",
                content: wrapper,
                buttons: false
            });
        })
        .catch(err => {
            if (err) {
                console.log(err);
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
    searchImage: (imageSearchResultElem, widgetid, imageUrlChanged) => searchImage(dispatch, imageSearchResultElem, widgetid, imageUrlChanged)
})

const stateToPropsMapper = state => ({})
const ImageContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Image)

export default ImageContainer

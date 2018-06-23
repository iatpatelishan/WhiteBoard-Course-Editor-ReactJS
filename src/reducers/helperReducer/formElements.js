import * as constants from "../../constants";

const elements  = (state = [], action) => {
    let maxid=state.length;
    switch (action.type) {
        case constants.FORM_ADD_ELEMENT:
            console.log(state);
            if(action.elementType==='INPUT') {
                return [...state,
                    {
                        id: maxid + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Input Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                    }]
            } else if (action.elementType==='CHECKBOX') {
                return [...state,
                    {
                        id: maxid + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Checkbox Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                    }]
            } else if (action.elementType==='RADIO') {
                return [...state,
                    {
                        id: maxid + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Radio Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                    }]
            } else if (action.elementType==='SELECT') {
                return [...state,
                    {
                        id: maxid + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Select Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                    }]
            } else if (action.elementType==='TEXTAREA') {
                return [...state,
                    {
                        id: maxid + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Textarea Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                    }]
            }
            return state
        default:
            return state
    }
}

export default elements;
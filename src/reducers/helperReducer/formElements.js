import * as constants from "../../constants";

const elements  = (state = [], action) => {
    let maxid=state.length;
    switch (action.type) {
        case constants.FORM_ADD_ELEMENT:
            if(action.elementType==='INPUT') {
                return [...state,
                    {
                        id: maxid + 1,
                        orderno: action.maxElementOrder + 1,
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
                        orderno: action.maxElementOrder + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Checkbox Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                        options: '',
                        answerList:[]
                    }]
            } else if (action.elementType==='RADIO') {
                return [...state,
                    {
                        id: maxid + 1,
                        orderno: action.maxElementOrder + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Radio Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                        options: '',
                        answer:-1
                    }]
            } else if (action.elementType==='SELECT') {
                return [...state,
                    {
                        id: maxid + 1,
                        orderno: action.maxElementOrder + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Select Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                        options: '',
                        answerList:[]
                    }]
            } else if (action.elementType==='TEXTAREA') {
                return [...state,
                    {
                        id: maxid + 1,
                        orderno: action.maxElementOrder + 1,
                        cssClass: '',
                        cssStyle: '',
                        label: 'Textarea Label',
                        labelDirection: 'Horizontal',
                        elementType: action.elementType,
                    }]
            }
            return state;
        case constants.FORM_DELETE_ELEMENT:
            return state.filter(element => element.id !== action.elementId);
        case constants.FORM_CHANGE_LABEL:
            return state.map(element => {
                if (element.id === action.elementId) {
                    element.label = action.label;
                }
                return Object.assign({}, element)
            });
        case constants.FORM_CHANGE_LABEL_DIRECTION:
            return state.map(element => {
                if (element.id === action.elementId) {
                    element.labelDirection = action.labelDirection;
                }
                return Object.assign({}, element)
            });
        case constants.FORM_CHANGE_CSS_STYLE:
            return state.map(element => {
                if (element.id === action.elementId) {
                    element.cssStyle = action.cssStyle;
                }
                return Object.assign({}, element)
            });
        case constants.FORM_CHANGE_OPTIONS:
            return state.map(element => {
                if (element.id === action.elementId) {
                    element.options = action.options;
                }
            return Object.assign({}, element)
            });
        case constants.FORM_CHANGE_ANSWER:
            return state.map(element => {
                if (element.id === action.elementId) {
                    element.answer = action.answer;
                }
                return Object.assign({}, element)
            });
        case constants.FORM_CHANGE_ANSWER_LIST:
            return state.map(element => {
                if (element.id === action.elementId) {
                    if(action.ans){
                        element.answerList.push(action.opt);
                    } else {
                        element.answerList = element.answerList.filter(e => e !== action.opt)
                    }
                }
                return Object.assign({}, element)
            });
        case constants.FORM_CHANGE_ANSWER_LIST_SELECT:
            return state.map(element => {
                if (element.id === action.elementId) {
                    element.answerList = action.ans;
                }
                return Object.assign({}, element)
            });
        default:
            return state
    }
}

export default elements;
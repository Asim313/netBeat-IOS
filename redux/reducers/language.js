import { LANGUAGE } from '../types';
import { languages } from '../languages';
const INITIAL_STATE = {
    lang : languages.english,
    selectedLangVal : 'en'
};
export const language = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LANGUAGE:
            return {
                ...state,
                lang: action.payload.lang,
                selectedLangVal : action.payload.selectedLangVal
            };        
            default:
            return state;
    }
};

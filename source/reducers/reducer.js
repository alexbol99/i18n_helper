/**
 * Created by alexanderbol on 30/12/2015.
 */
import * as ActionTypes from '../constants/actionTypes';

const initialState = {
    locale: [],
    languages: new Map(),
    importFilesPopupOpened: false,
    downloadFilesPopupOpened: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_IMPORT_FILES_POPUP:
            return Object.assign({}, state, {
                importFilesPopupOpened: true
            });
        case ActionTypes.CLOSE_IMPORT_FILES_POPUP:
            return Object.assign({}, state, {
                importFilesPopupOpened: false
            });
        case ActionTypes.OPEN_DOWNLOAD_FILES_POPUP:
            return Object.assign({}, state, {
                downloadFilesPopupOpened:true
            });
        case ActionTypes.CLOSE_DOWNLOAD_FILES_POPUP:
            return Object.assign({}, state, {
                downloadFilesPopupOpened:false
            });
        case ActionTypes.FETCH_LOCALE_SUCCEED:
            return Object.assign({}, state, {
                locale: action.locale
            });
        case ActionTypes.FETCH_LANGUAGES_SUCCEED:
            return Object.assign({}, state, {
                languages: action.languages
            });
        default:
            return state;
    }

};


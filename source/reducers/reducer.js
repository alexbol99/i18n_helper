/**
 * Created by alexanderbol on 30/12/2015.
 */
import * as ActionTypes from '../constants/actionTypes';
import { combineReducers } from '../../lib/redux';

const initialState = {
    locale: [],
    languages: new Map(),
    importFilesPopupOpened: false,
    downloadFilesPopupOpened: false
};

function importFilesPopupOpened(state = false, action) {
    switch (action.type) {
        case ActionTypes.OPEN_IMPORT_FILES_POPUP:
            return true;
        case ActionTypes.CLOSE_IMPORT_FILES_POPUP:
            return false;
        default:
            return state;
    }
}

function downloadFilesPopupOpened(state = false, action ) {
    switch (action.type) {
        case ActionTypes.OPEN_DOWNLOAD_FILES_POPUP:
            return true;
        case ActionTypes.CLOSE_DOWNLOAD_FILES_POPUP:
            return false;
        default:
            return state;
    }
}

function locale(state = [], action) {
    switch (action.type) {
        case ActionTypes.FETCH_LOCALE_SUCCEED:
            return action.locale;
        default:
            return state;
    }
}

function languages(state = new Map(), action) {
    switch (action.type) {
        case ActionTypes.FETCH_LANGUAGES_SUCCEED:
            return action.languages;
        default:
            return state;
    }
}

export var reducer = combineReducers({
    importFilesPopupOpened,
    downloadFilesPopupOpened,
    locale,
    languages
})



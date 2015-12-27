/**
 * Created by alexanderbol on 26/12/15.
 */
import { createStore } from '../../lib/redux';
import { OPEN_IMPORT_FILES_POPUP } from '../constants/actionTypes';

const initialState = {
    importFilesPopupOpened: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_IMPORT_FILES_POPUP:
            return {
                importFilesPopupOpened: true
            }
        default:
            return state;
    }

};

export const store = createStore(reducer);

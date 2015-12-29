/**
 * Created by alexanderbol on 26/12/15.
 */
import { createStore } from '../../lib/redux';
import { reducer } from '../reducers/reducer';

export const store = createStore(reducer);

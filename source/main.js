/**
 * Created by alexbol on 10/25/2015.
 */

import { store } from 'store/configureStore';
import { App } from 'app';

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('app')
);



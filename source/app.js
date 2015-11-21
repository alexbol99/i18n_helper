/**
 * Created by alexbol on 11/18/2015.
 */

import { Parse } from '../lib/parse-1.6.7.min';
import { LocaleComponent } from 'components/localeComponent';
import { Locale } from 'models/locale';

var en = new Locale();

export var App = React.createClass({
    getInitialState: function() {
        return ({
            locale: {}
        });
    },

    componentWillMount: function() {
        var self = this;
        Object.observe( en, ( changes ) =>
            self.setState({ locale: en.get('data')}) );
        en.fetchEn();
    },

    render: function() {
        return (
            <div>
                <h1>I am just testing</h1>
                <LocaleComponent
                    locale = {this.state.locale}
                />
            </div>
        );
    },

});


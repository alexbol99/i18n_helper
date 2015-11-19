/**
 * Created by alexbol on 11/18/2015.
 */

import { Parse } from '../lib/parse-1.6.7.min';
import { LocaleView } from 'locale';

class Locale extends Parse.Object {
    constructor() {
        super('Locale');     // Pass the ClassName to the Parse.Object constructor
    }
}

// var Locale = Parse.Object.extend("Locale");
var localeQueryEn = new Parse.Query(Locale)
    .equalTo("lang", "en");
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
        this.queryEn();
    },

    render: function() {
        return (
            <div>
                <h1>I am just testing</h1>
                <LocaleView
                    locale = {this.state.locale}
                />
            </div>
        );
    },

    queryEn: function() {
        localeQueryEn.find().then( (resp) =>
            en.set( "data", JSON.parse(resp[0].get("data")) )
        )
    }
});


/**
 * Created by Owner on 12/4/15.
 */
import { Parse } from '../../lib/parse-1.6.7.min';

Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

export class Language extends Parse.Object {
    constructor() {
        super('Language');     // Pass the ClassName to the Parse.Object constructor
    }
    fetch() {
        var localeQuery = new Parse.Query(Language)
        return localeQuery.find();
    }
    add(lang) {
        var _this = this;
        var promise = new Parse.Promise();

        var query = new Parse.Query(Language)
            .equalTo("iso", lang);

        query.find().then( (resp) => {
            if (resp.length == 0) {
                var l = new Language();
                l.set('iso', lang);
                l.save().then( () => {
                    promise.resolve();
                });
            }
            else {
                promise.resolve();
            }
        });
        return promise;
    }
}
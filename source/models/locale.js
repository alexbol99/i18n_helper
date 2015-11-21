/**
 * Created by Owner on 11/21/15.
 */
import { Parse } from '../../lib/parse-1.6.7.min';

Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

export class Locale extends Parse.Object {
    constructor() {
        super('Locale');     // Pass the ClassName to the Parse.Object constructor
    }
    fetchEn() {
        var localeQueryEn = new Parse.Query(Locale)
            .equalTo("lang", "en");
        localeQueryEn.find().then( (resp) =>
                this.set( "data", JSON.parse(resp[0].get("data")) )
        )
    }
}

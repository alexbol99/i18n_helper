/**
 * Created by Owner on 11/21/15.
 */
import { Parse } from '../../lib/parse-1.6.7.min';
import { loadJSON } from '../loader';

Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

export class Locale extends Parse.Object {
    constructor() {
        super('Locale');     // Pass the ClassName to the Parse.Object constructor
    }
    fetchEn() {
        var localeQueryEn = new Parse.Query(Locale)
            .equalTo("lang", "en");
        var _this = this;
        localeQueryEn.find().then( (resp) => {
                var TranslationFile = Parse.Object.extend('TranslationFile');
                var fileQueryEn = new Parse.Query(TranslationFile)
                    .equalTo("lang", "en");
                fileQueryEn.find().then( (resp) => {
                    var file = resp[0].get('file');
                    loadJSON(file.url(),
                        (json) =>  _this.set( "data", json ),
                        (err) => console.log(err));
                })
        })
    }
    uploadFile(f) {
        var parseFile = new Parse.File(f.name, f);
        parseFile.save().then( (resp) => {
            console.log("The file has been saved to Parse");

            // Remove object with same lang if exist
            var lang = f.name.split('.')[0];
            var TranslationFile = Parse.Object.extend('TranslationFile');
            var fileQuery = new Parse.Query(TranslationFile)
                .equalTo("lang", lang);

            fileQuery.find().then( (resp) => {
                if (resp.length > 0) {
                    var oldTranslationFileObject = resp[0];
                    oldTranslationFileObject.destroy();
                }

                var newTranslationFileObject = new Parse.Object("TranslationFile");
                newTranslationFileObject.set("name", f.name);
                newTranslationFileObject.set("lang", lang);
                newTranslationFileObject.set("file", parseFile);
                newTranslationFileObject.save();
            });
        }, (error) => {
            console.log("The file either could not be read, or could not be saved to Parse");
        });
    }
    createFile() {
        var TranslationFile = Parse.Object.extend('TranslationFile');
        var fileQueryEn = new Parse.Query(TranslationFile)
            .equalTo("lang", "cn");

        fileQueryEn.find().then( (resp) => {
            var file = resp[0].get('file');
            loadJSON(file.url(),
                (json) => {
                    // _this.set( "data", json )
                    var str = JSON.stringify(json);
                    var str_b64 = window.btoa(unescape(encodeURIComponent(str)));
                    var parseFile = new Parse.File("cncn.json", { base64: str_b64 });
                    parseFile.save().then(function(resp) {
                        console.log("The file has been saved to Parse");
                    }, function(error) {
                        console.log("The file either could not be read, or could not be saved to Parse");
                    });
                },
                (err) => console.log(err));
        })
    }
}


/*

var TranslationFile = Parse.Object.extend("TranslationFile");
var query = new Parse.Query(TranslationFile)
    .equalTo("name", "en.json");
query.find().then (function( resp ) {
    var file = resp[0].get("file");
    Parse.Cloud.httpRequest({ url: file.url() }).then(function(response) {
        console.log(response);
    });
});

*/
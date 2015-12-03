/**
 * Created by Owner on 11/21/15.
 */
import { Parse } from '../../lib/parse-1.6.7.min';
import { loadJSON } from '../loader';

Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

var TranslationFile = Parse.Object.extend('TranslationFile');

export class Locale extends Parse.Object {
    constructor() {
        super('Locale');     // Pass the ClassName to the Parse.Object constructor
    }
    fetchEn() {
        var localeQueryEn = new Parse.Query(Locale)
            .equalTo("lang", "en")
            .limit(1000);
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
                });
        });
    }
    updateLang(id, lang, text) {
        var query = new Parse.Query(Locale);
        query.get(id).then((record) => {
            record.set(lang, text);
            record.save();
        });
    }
    fetch() {
        var localeQuery = new Parse.Query(Locale)
            .limit(1000);
        //localeQuery.find().then( (resp) =>
        //    this.set("data", resp)
        //);
        return localeQuery.find();
    }
    fromJSON(lang, json, parent) {
        var promises = [];

        for (let tag in json) {

            var localeQuery = new Parse.Query(Locale)
                .equalTo("tag", tag);
            if (parent) {
                localeQuery.equalTo("parent", parent);
            }

            localeQuery.find().then( (resp) => {
                var locale;
                if (resp.length > 0) {
                    locale = resp[0];
                }
                else {
                    locale = new Locale();
                    locale.set("tag", tag);
                    if (parent) {
                        locale.set("parent", parent);
                    }
                }

                if (typeof json[tag] == "string") {
                    locale.set("section", false);
                    locale.set(lang, json[tag]);
                }
                if (typeof json[tag] == "object") {
                    locale.set("section", true);
                }

                var promise = new Parse.Promise();
                promises.push(promise);

                locale.save().then( (locale) => {                 // save to Parse Locale table
                    if (typeof json[tag] == "object") {
                        this.fromJSON(lang, json[tag], locale).then( function( resp) {
                            console.log("inner promise resolved");
                            promise.resolve();
                        });   // recursive call
                    }
                    else {      // typeof json[tag] == "string"
                        promise.resolve();
                    }
                });
            });
        }
        return Parse.Promise.when(promises); //  for some reason became resolved before inner promised are resolves
    }
    toJSON(lang, locale, parent, json) {
        locale.forEach( (record) => {
            var tag = record.get("tag");
            var ok = parent ?
                (record.get("parent") ? record.get("parent").id == parent.id : false) :
                (record.get("parent") == undefined);
            if (ok) {
                json[tag] = record.get("section") ? {} : record.get(lang);
            }
            if (typeof json[tag] == "object") {
                this.toJSON(lang, locale, record, json[tag]);   // recursive call
            }
        });
    }
    uploadFile(f) {
        var _this = this;
        var promise = new Parse.Promise();

        var parseFile = new Parse.File(f.name, f);
        parseFile.save().then( (resp) => {

            // Query File Object with language as file name
            var lang = f.name.split('.')[0];
            var fileQuery = new Parse.Query(TranslationFile)
                .equalTo("lang", lang);

            fileQuery.find().then( (resp) => {

                // If already exist - destroy old File Object
                if (resp.length > 0) {
                    var oldTranslationFileObject = resp[0];
                    oldTranslationFileObject.destroy();
                }

                // Then create and save new File Object
                var newTranslationFileObject = new TranslationFile({
                    "name" : f.name,
                    "lang" : lang,
                    "file" : parseFile
                });

                newTranslationFileObject.save().then( (resp) => {
                    // Now read the file and create JSON object
                    var file = resp.get('file');
                    loadJSON(file.url(),
                        (json) => {
                            _this.fromJSON(lang, json, null).then( function (resp) {
                                console.log('we are here');
                                promise.resolve();
                            });
                        },
                        (error) => {
                            console.log("Error loading json");
                        }
                    );
                });
            });
        }, (error) => {
            console.log("The file either could not be read, or could not be saved to Parse");
        });

        return promise;
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
        });
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
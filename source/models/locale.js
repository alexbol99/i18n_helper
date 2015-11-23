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
}


/*
Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

var dropbox = document.getElementById("filedrag");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

var TranslationFile = Parse.Object.extend("TranslationFile");
var query = new Parse.Query(TranslationFile)
    .equalTo("name", "en.json");
query.find().then (function( resp ) {
    var file = resp[0].get("file");
    Parse.Cloud.httpRequest({ url: file.url() }).then(function(response) {
        console.log(response);
    });
});

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}
function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    // process all File objects

    var f = files[0];
    console.log(f);

    var parseFile = new Parse.File(f.name, f);
    parseFile.save().then(function(resp) {
        console.log("The file has been saved to Parse");

        var translationFile = new Parse.Object("TranslationFile");
        translationFile.set("name", f.name);
        translationFile.set("file", parseFile);
        translationFile.save();

    }, function(error) {
        console.log("The file either could not be read, or could not be saved to Parse");
    });
*/
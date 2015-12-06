/**
 * Created by alexbol on 11/18/2015.
 */

import { HeaderComponent } from 'components/headerComponent';
import { LocaleComponent } from 'components/localeComponent';
import { UploadFilesPopup } from 'components/uploadFilesPopup';
import { DownloadFilesPopup } from 'components/downloadFilesPopup';

import { Locale } from 'models/locale';
import { Language } from 'models/language';

//import { Parse } from '../../lib/parse-1.6.7.min';
//Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

var localeModel = Locale.prototype;
var languageModel = Language.prototype;

export var App = React.createClass ({
    getInitialState() {
        return ({
            locale: [],
            languages: new Map(),
            importFilesPopupOpened: false,
            downloadFilesPopupOpened: false
        });
    },
    //observe: function(props, state) {
    //    return {
    //        locale: (new Parse.Query(Locale))
    //            .limit(1000)
    //    };
    //},
    componentWillMount() {
        this.fetchData();
    },
    fetchData() {
        localeModel.fetch().then( (locale) => {
            this.setState({
                locale: locale
            });
            return languageModel.fetch();
        }).then( (languages) => {
            var m = new Map();
            languages.forEach( (lang) => {
                m.set(lang.get("iso"), true);
            });
            this.setState({
                languages: m
            });
        });
    },
    fetchLocale() {
        var promise = new Parse.Pro
    },
    showImportFilesPopup() {
        this.setState({
            importFilesPopupOpened: true
        });
    },
    hideImportFilesPopup() {
        this.setState({
            importFilesPopupOpened: false
        });
    },
    uploadLocaleFile(f) {
        var lang = f.name.split('.')[0];
        localeModel.uploadFile(f).then( (resp) => {
            return languageModel.add(lang);
        }).then( (resp) => {
            this.fetchData();
            // this.hideImportFilesPopup();
        });
    },
    showDownloadFilesPopup() {
        this.setState({
            downloadFilesPopupOpened: true
        })
    },
    hideDownloadFilesPopup() {
        this.setState({
            downloadFilesPopupOpened: false
        })
    },
    downloadJSON() {
        var json = {};
        localeModel.toJSON("en", locale.get('data'), null, json);
    },
    onItemChanged(event) {
        var id = event.target.id;
        var lang = event.target.name;
        var text = event.target.value;
        // Update data on Parse
        localeModel.updateLang(id, lang, text);
        // Change state and render
        var newLocale = this.state.locale.slice();
        newLocale.forEach( (record) => {
            if (record.id == id) {
                record.set(lang,text);
            }
        } );
    },
    //onItemSubmitted() {
    //    this.forceUpdate();
    //},
    changeLanguageDisplayed(event) {
        var m = new Map();
        this.state.languages.forEach( (checked, lang) => {
            if (lang == event.target.name) {
                m.set(lang, event.target.checked);
            }
            else {
                m.set(lang, checked);
            }
        });
        this.setState({
            languages: m
        });
    },
    render() {
        var header = (
            <HeaderComponent
                onImportButtonClick = {this.showImportFilesPopup}
                onDownloadButtonClick = {this.showDownloadFilesPopup}
                languages = {this.state.languages}
                onLanguageCheckboxChanged = {this.changeLanguageDisplayed}
            />
        );

        var content = this.state.locale.length > 0 && this.state.languages.size > 0 ? (
            <ReactBootstrap.Panel>
                <LocaleComponent
                    locale = {this.state.locale}
                    languages = {this.state.languages}
                    onItemChanged = {this.onItemChanged}
                    onItemSubmitted = {this.forceUpdate}
                />
            </ReactBootstrap.Panel>
        ) : (
            <ReactBootstrap.Image src="assets/localization4.png" style={{
                display: 'block',
                margin: 'auto'
            }} />
        );

        var importPopup = this.state.importFilesPopupOpened ? (
            <UploadFilesPopup
                showPopup = {this.state.importFilesPopupOpened}
                hidePopup = {this.hideImportFilesPopup}
                uploadFile = {this.uploadLocaleFile}
            />
        ) : null;

        var downloadPopup = this.state.downloadFilesPopupOpened ? (
            <DownloadFilesPopup
                locale = {this.state.locale}
                languages = {this.state.languages}
                showPopup = {this.state.downloadFilesPopupOpened}
                hidePopup = {this.hideDownloadFilesPopup}
                onFileButtonClick = {this.downloadJSON}
            />
        ) : null;

        return (
            <ReactBootstrap.Panel style={{width: '70vw', margin: 'auto'}}>
                {header}
                <br/>
                {content}
                {importPopup}
                {downloadPopup}
            </ReactBootstrap.Panel>
        );
    }

});


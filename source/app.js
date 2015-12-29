/**
 * Created by alexbol on 11/18/2015.
 */

import { HeaderComponent } from 'components/headerComponent';
import { LocaleComponent } from 'components/localeComponent';
import { UploadFilesPopup } from 'components/uploadFilesPopup';
import { DownloadFilesPopup } from 'components/downloadFilesPopup';

import { Locale } from 'models/locale';
import { Language } from 'models/language';

import { OPEN_IMPORT_FILES_POPUP } from 'constants/actionTypes';

//import { Parse } from '../../lib/parse-1.6.7.min';
//Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

var localeModel = Locale.prototype;
var languageModel = Language.prototype;

export class App extends React.Component {
    constructor(props, { store }) {
        super(props);
        // this.showImportFilesPopup = this.showImportFilesPopup.bind(this);
        // this.showDownloadFilesPopup = this.showDownloadFilesPopup.bind(this);
        this.changeLanguageDisplayed = this.changeLanguageDisplayed.bind(this);
        this.onItemChanged = this.onItemChanged.bind(this);
        this.onItemSubmitted = this.onItemSubmitted.bind(this);
        // this.hideImportFilesPopup = this.hideImportFilesPopup.bind(this);
        this.uploadLocaleFile = this.uploadLocaleFile.bind(this);
        // this.hideDownloadFilesPopup = this.hideDownloadFilesPopup.bind(this);
        this.downloadJSON = this.downloadJSON.bind(this);

    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        localeModel.fetch().then( (locale) => {
            this.context.store.dispatch({
                type: 'FETCH_LOCALE_SUCCEED',
                locale: locale
            });
            return languageModel.fetch();
        }).then( (languages) => {
            var m = new Map();
            languages.forEach( (lang) => {
                m.set(lang.get("iso"), true);
            });
            this.context.store.dispatch({
                type: 'FETCH_LANGUAGES_SUCCEED',
                languages: m
            });
        });
    }

    uploadLocaleFile(f) {
        var lang = f.name.split('.')[0];
        localeModel.uploadFile(f).then( (resp) => {
            return languageModel.add(lang);
        }).then( (resp) => {
            this.fetchData();
            // this.hideImportFilesPopup();
        });
    }

    downloadJSON() {
        var json = {};
        localeModel.toJSON("en", locale.get('data'), null, json);
    }

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
    }

    onItemSubmitted() {
        this.forceUpdate();
    }

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
    }

    render() {
        var header = (
            <HeaderComponent
                onImportButtonClick = { () =>
                    this.context.store.dispatch({ type: 'OPEN_IMPORT_FILES_POPUP' } )
                 }
                onDownloadButtonClick = { () =>
                    this.context.store.dispatch({ type: 'OPEN_DOWNLOAD_FILES_POPUP'} )
                }
                languages = {this.context.store.getState().languages}
                onLanguageCheckboxChanged = {this.changeLanguageDisplayed}
            />
        );

        var content = this.context.store.getState().locale.length > 0 &&
                      this.context.store.getState().languages.size > 0 ? (
            <ReactBootstrap.Panel>
                <LocaleComponent
                    locale = {this.context.store.getState().locale}
                    languages = {this.context.store.getState().languages}
                    onItemChanged = {this.onItemChanged}
                    onItemSubmitted = {this.onItemSubmitted}
                />
            </ReactBootstrap.Panel>
        ) : (
            <ReactBootstrap.Image src="assets/localization4.png" style={{
                display: 'block',
                margin: 'auto'
            }} />
        );

        var importFilesPopupOpened = this.context.store.getState().importFilesPopupOpened;
        var importPopup = importFilesPopupOpened ? (
            <UploadFilesPopup
                showPopup = {importFilesPopupOpened}
                hidePopup = { () =>
                    this.context.store.dispatch({ type: 'CLOSE_IMPORT_FILES_POPUP' })
                }

                uploadFile = {this.uploadLocaleFile}
            />
        ) : null;

        var downloadFilesPopupOpened = this.context.store.getState().downloadFilesPopupOpened;
        var downloadPopup = downloadFilesPopupOpened ? (
            <DownloadFilesPopup
                locale = {this.context.store.getState().locale}
                languages = {this.context.store.getState().languages}
                showPopup = {downloadFilesPopupOpened}
                hidePopup = { () =>
                    this.context.store.dispatch({ type: 'CLOSE_DOWNLOAD_FILES_POPUP'})
                }
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

}
App.contextTypes = {
    store: React.PropTypes.object
};

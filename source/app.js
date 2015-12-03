/**
 * Created by alexbol on 11/18/2015.
 */

import { Parse } from '../lib/parse-1.6.7.min';
//import { ParseReact } from 'lib/parse-react.js';

import { HeaderComponent } from 'components/headerComponent';
import { LocaleComponent } from 'components/localeComponent';
import { UploadFilesPopup } from 'components/uploadFilesPopup';

import { Locale } from 'models/locale';

//Parse.initialize("MqfgDGIMgptBIgS6NqUMydGmjlXsfZaviORg4g2B","6x0jRJz3pUX4By1hzgonTMBPsCgSlpNE7kRNKxxc");

var locale = new Locale();

export var App = React.createClass ({
    // mixins: [ParseReact.Mixin],
    getInitialState() {
        return ({
            locale: [],
            importFilesPopupOpened: false
        });
    },
    //observe: function(props, state) {
    //    return {
    //        locale: (new Parse.Query(Locale))
    //            .limit(1000)
    //    };
    //},
    componentWillMount() {
        //var self = this;
        /* TODO: polyfill Object.observe for browsers other than Chrome or implement immutable */
        //Object.observe(locale, (changes) =>
        //    self.setState({
        //        locale: locale.get('data'),
        //        loaded: true
        //    }));
        this.fetchLocale();
        // locale.createFile();
    },
    fetchLocale() {
        locale.fetch().then( (resp) =>
            this.setState({
                locale: resp
            }));
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
        locale.uploadFile(f).then( (resp) => {
            this.fetchLocale();
            this.hideImportFilesPopup();
        } );
    },
    downloadJSON() {
        var json = {};
        locale.toJSON("en", locale.get('data'), null, json);
    },
    onItemChanged(event) {
        var id = event.target.id;
        var lang = event.target.name;
        var text = event.target.value;
        locale.updateLang(id, lang, text);
    },
    render() {
        var content = this.state.locale.length > 0 ? (
            <ReactBootstrap.Panel>
                <LocaleComponent
                    locale = {this.state.locale}
                    onItemChanged = {this.onItemChanged}
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

        return (
            <ReactBootstrap.Panel style={{width: '70vw', margin: 'auto'}}>
                <HeaderComponent
                    onImportButtonClick = {this.showImportFilesPopup}
                    onDownloadButtonClick = {this.downloadJSON}
                />
                <br/>
                {content}
                {importPopup}
            </ReactBootstrap.Panel>
        );
    }

});


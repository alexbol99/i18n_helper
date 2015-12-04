/**
 * Created by alexbol on 11/18/2015.
 */

import { HeaderComponent } from 'components/headerComponent';
import { LocaleComponent } from 'components/localeComponent';
import { UploadFilesPopup } from 'components/uploadFilesPopup';

import { Locale } from 'models/locale';

var localeModel = Locale.prototype;

export var App = React.createClass ({
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
        this.fetchLocale();
    },
    fetchLocale() {
        localeModel.fetch().then( (resp) =>
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
        localeModel.uploadFile(f).then( (resp) => {
            this.fetchLocale();
            // this.hideImportFilesPopup();
        } );
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
    onItemSubmitted() {
        this.forceUpdate();
    },
    render() {
        var content = this.state.locale.length > 0 ? (
            <ReactBootstrap.Panel>
                <LocaleComponent
                    locale = {this.state.locale}
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


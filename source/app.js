/**
 * Created by alexbol on 11/18/2015.
 */

import { Parse } from '../lib/parse-1.6.7.min';

import { HeaderComponent } from 'components/headerComponent';
import { LocaleComponent } from 'components/localeComponent';
import { UploadFilesPopup } from 'components/uploadFilesPopup';

import { Locale } from 'models/locale';

var locale = new Locale();

export var App = React.createClass ({
    getInitialState() {
        return ({
            locale: {},
            loaded: false,
            importFilesPopupOpened: false
        });
    },
    componentWillMount() {
        var self = this;
        /* TODO: polyfill Object.observe for browsers other than Chrome or implement immutable */
        Object.observe(locale, (changes) =>
            self.setState({
                locale: locale.get('data'),
                loaded: true
            }));
        locale.fetch();
        // locale.createFile();
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
        locale.uploadFile(f);
    },
    downloadJSON() {
        var json = {};
        locale.toJSON("en", locale.get('data'), null, json);
    },
    render() {
        var content = this.state.loaded ? (
            <LocaleComponent
                locale = {this.state.locale}
            />
        ) : (
            <ReactBootstrap.Image src="assets/letter-blocks-aqua.png" circle style={{
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
                {content}
                {importPopup}
            </ReactBootstrap.Panel>
        );
    }

});


/**
 * Created by Owner on 12/5/15.
 */

import { Locale } from 'models/locale';
var localeModel = Locale.prototype;

export var DownloadFilesPopup = React.createClass({
    getInitialState: function() {
        return ({
            downloadLinks: new Map()
        });
    },
    componentDidMount() {
        var m = new Map();
        this.props.languages.forEach( (checked, lang) => {
            m.set(lang, "");
        });
        this.setState({
            downloadLinks: m
        });
    },
    createFile(event) {
        var curLang = event.target.id;
        var json = {};
        var _this = this;
        localeModel.toJSON(curLang, this.props.locale, null, json);
        localeModel.createFile(curLang, json).then( (resp) => {
            var curUrl = resp.url();
            var m = new Map();
            _this.state.downloadLinks.forEach( (url, lang) => {
                if (lang == curLang) {
                    m.set(lang, curUrl);
                }
                else {
                    m.set(lang, url);
                }
            });
            _this.setState({
                downloadLinks: m
            });
        });
    },
    render() {
        var languages = [];
        this.props.languages.forEach( (checked, lang) => {
            languages.push(lang);
        });
        return (
            <div className="static-modal">
                <ReactBootstrap.Modal.Dialog show={this.props.showPopup} onHide={this.props.hidePopup}>
                    <ReactBootstrap.Modal.Header closeButton onHide={this.props.hidePopup}>
                        <ReactBootstrap.Modal.Title>
                            Download Translation Files
                        </ReactBootstrap.Modal.Title>
                    </ReactBootstrap.Modal.Header>

                    <ReactBootstrap.Modal.Body>
                        <ReactBootstrap.Panel>
                            <ReactBootstrap.Grid fluid>
                            {languages.map( (lang) => {
                                var href = this.state.downloadLinks.get(lang);
                                var link = (href == "") ? null : (
                                    <a href={href} download={lang + ".json"}>
                                        {lang + ".json"}
                                    </a>
                                );
                                var linkButton = (href == "") ? (
                                    <ReactBootstrap.Button href="#" bsSize="large" disabled>
                                        <ReactBootstrap.Glyphicon glyph="cloud-download" />
                                    </ReactBootstrap.Button>
                                ) : (
                                    <ReactBootstrap.Button href={href} bsSize="large" bsStyle="info" download={lang + ".json"}>
                                        <ReactBootstrap.Glyphicon glyph="cloud-download" />
                                    </ReactBootstrap.Button>
                                );

                                return (
                                    <ReactBootstrap.Row key={lang} className="show-grid">

                                        <ReactBootstrap.Col xs={6} md={4}>
                                            <ReactBootstrap.Button bsSize="large" id={lang} onClick={this.createFile}>
                                                {lang}
                                            </ReactBootstrap.Button>
                                        </ReactBootstrap.Col>

                                        <ReactBootstrap.Col xs={6} md={4}>
                                            {link}
                                        </ReactBootstrap.Col>

                                        <ReactBootstrap.Col xs={6} md={4}>
                                            {linkButton}
                                        </ReactBootstrap.Col>

                                    </ReactBootstrap.Row>
                                )
                            })
                            }
                            </ReactBootstrap.Grid>
                        </ReactBootstrap.Panel>
                    </ReactBootstrap.Modal.Body>

                    <ReactBootstrap.Modal.Footer>
                        <ReactBootstrap.Button onClick={this.props.hidePopup}>Close</ReactBootstrap.Button>
                    </ReactBootstrap.Modal.Footer>

                </ReactBootstrap.Modal.Dialog>
            </div>
        );
    }
});

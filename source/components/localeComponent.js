// var languages = ['en', 'cn', 'ja', 'ru'];

export var LocaleComponent = React.createClass({
    getInitialState() {
        return ({
        });
    },
    isRecordValid(record) {
        var valid = true;
        this.props.languages.forEach( (checked, lang) => {
            if (checked) {
                var text = record.get(lang);
                var textEn = record.get("en");
                if (text == "" || lang != "en" && text == textEn) {
                    valid = false;
                }
            }
        });
        return valid;
    },
    isValid(locale, record) {
        var valid = true;
        if (record.get("section")) {
            locale.forEach((rec) => {
                if (rec.get("parent")) {
                    if (rec.get("parent").id == record.id) {
                        valid = this.isValid(locale, rec);
                    }
                }
            });
        }
        else {             // record.get("section") == false => this is an item
            valid = this.isRecordValid(record);
        }
        return valid;
    },
    render() {
        return (
            <ReactBootstrap.PanelGroup defaultActiveKey="2" accordion>
                {this.props.locale.map(
                    record => {
                        var parent = record.get("parent");
                        var condition = this.props.parent ?
                            (parent ? parent.id == this.props.parent.id : false) :
                            (parent == undefined);
                        if (condition) {
                            var tag = record.get("tag");
                            var section = record.get("section");

                            var itemComponentInstance = !section ? (
                                <LangItemsList
                                    record = {record}
                                    languages = {this.props.languages}
                                    onItemChanged = {this.props.onItemChanged}
                                    onItemSubmitted = {this.props.onItemSubmitted}
                                />) : null;

                            var isValid = this.isValid(this.props.locale, record);
                            var panelStyle = isValid? "success" : "danger";

                            var headerInstance = section ? (
                                <h3>
                                    Section:
                                    &nbsp;
                                    <b>{tag}</b>
                                </h3>
                            ) : (
                                <h3>
                                    Tag:
                                &nbsp;
                                    <b>{tag}</b>
                                </h3>
                            );

                            return (
                                <ReactBootstrap.Panel key={record.id} header={headerInstance} eventKey={tag} bsStyle={panelStyle} >
                                    <LocaleComponent
                                        locale = {this.props.locale}
                                        languages = {this.props.languages}
                                        parent = {record}
                                        onItemChanged = {this.props.onItemChanged}
                                        onItemSubmitted = {this.props.onItemSubmitted}
                                    />
                                    {itemComponentInstance}
                                </ReactBootstrap.Panel>
                            )
                        }
                    }
                )}
            </ReactBootstrap.PanelGroup>
        );
    }
});

var LangItemsList = React.createClass({
    getInitialState() {
        return ({
        });
    },
    render() {
        var languages = [];
        this.props.languages.forEach( (checked, lang) => {
            if (checked) {
                languages.push(lang);
            }
        });
        return (
            <ReactBootstrap.ListGroup>
                {languages.map( (lang) => {
                    /* Get all keys of the object and suppose than lang is two-symbols string and not 'id' */
                    //if (lang.length != 2 || lang == 'id')
                    //    return;
                    var tag = this.props.record.get("tag");
                    var text = this.props.record.get(lang);
                    var textEn = this.props.record.get("en");
                    return (
                        <LangItem key={tag + lang}
                            id = {this.props.record.id}
                            lang = {lang}
                            tag = {tag}
                            text = {text}
                            textEn = {textEn}
                            onItemChanged = {this.props.onItemChanged}
                            onItemSubmitted = {this.props.onItemSubmitted}
                        />
                    )
                }) }
            </ReactBootstrap.ListGroup>
        );
    }
});

var LangItem = React.createClass({
    getInitialState() {
        return ({
            text: ""
        });
    },
    isValid() {
        var valid = true;
        if (this.state.text == "" ||
            (this.props.lang != "en" && this.state.text == this.props.textEn)) {
            valid = false;
        }
        return valid;
    },
    componentWillMount() {
        this.setState({
            text: this.props.text
        })
    },
    onChangeHandler(event) {
        this.setState({
            text: this.refs.input.getValue()
        }, this.props.onItemChanged(event));
        //this.props.onItemChanged(event);
    },
    inputSubmitted(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onItemSubmitted();
    },
    render() {

        var bsStyle = this.isValid() ? "success" : "error";

        return (
            <ReactBootstrap.ListGroupItem>
                <ReactBootstrap.Grid>
                    <ReactBootstrap.Row>

                        <ReactBootstrap.Col xs={2} md={2}>
                            {this.props.lang}
                        </ReactBootstrap.Col>

                        <ReactBootstrap.Col xs={10} md={10}>
                            <form target="#" onSubmit = {this.inputSubmitted}>
                                <ReactBootstrap.Input
                                    type="text"
                                    bsStyle={bsStyle}
                                    style={{width: "80%"}}
                                    value={this.state.text}
                                    placeholder="Enter text"
                                    name={this.props.lang}
                                    id={this.props.id}
                                    ref="input"
                                    hasFeedback
                                    onChange={this.onChangeHandler}
                                />
                            </form>
                        </ReactBootstrap.Col>

                    </ReactBootstrap.Row>
                </ReactBootstrap.Grid>
            </ReactBootstrap.ListGroupItem>
        )
    }

});

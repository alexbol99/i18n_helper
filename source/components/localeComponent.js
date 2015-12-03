export var LocaleComponent = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
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
                                <ItemComponent
                                    record = {record}
                                    onItemChanged = {this.props.onItemChanged}
                                />) : null;

                            var panelStyle = section ? "info" : "default";

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
                                        parent = {record}
                                        onItemChanged = {this.props.onItemChanged}
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

var languages = ['en', 'cn', 'ja', 'ru'];

var ItemComponent = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <ReactBootstrap.ListGroup>
                {languages.map( (lang) => {
                    /* Get all keys of the object and suppose than lang is two-symbols string and not 'id' */
                    if (lang.length != 2 || lang == 'id')
                        return;
                    var tag = this.props.record.get("tag");
                    var text = this.props.record.get(lang);
                    return (
                        <ReactBootstrap.ListGroupItem key={tag + lang}>
                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row>
                                    <ReactBootstrap.Col xs={2} md={2}>
                                        {lang}
                                    </ReactBootstrap.Col>
                                    <ReactBootstrap.Col xs={10} md={10}>
                                        <ReactBootstrap.Input
                                            style={{width:"80%"}}
                                            type="text"
                                            value={text}
                                            placeholder="Enter text"
                                            defaultValue={text}
                                            name={lang}
                                            id={this.props.record.id}
                                            onChange={this.props.onItemChanged} />
                                    </ReactBootstrap.Col>
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>
                        </ReactBootstrap.ListGroupItem>
                    )
                })}
            </ReactBootstrap.ListGroup>
        );
    }
});

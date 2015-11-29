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
                        var condition = this.props.parent ?
                            (record.get("parent") ? record.get("parent").id == this.props.parent.id : false) :
                            (record.get("parent") == undefined);
                        if (condition) {
                            var tag = record.get("tag");

                            var itemComponentInstance = !record.get("section") ? (
                                <ItemComponent
                                    record = {record}
                                    onItemChanged = {this.props.onItemChanged}
                                />) : null;

                            var panelStyle = record.get("section") ? "info" : "default";

                            var headerInstance = record.get("section") ? (
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
                    return (
                        <ReactBootstrap.ListGroupItem key={this.props.record.get("tag") + lang}>
                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row>
                                    <ReactBootstrap.Col xs={2} md={2}>
                                        {lang}
                                    </ReactBootstrap.Col>
                                    <ReactBootstrap.Col xs={10} md={10}>
                                        <ReactBootstrap.Input
                                            style={{width:"80%"}}
                                            type="text"
                                            placeholder="Enter text"
                                            defaultValue={this.props.record.get(lang)}
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

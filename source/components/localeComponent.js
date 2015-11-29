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
                                    />
                                    {itemComponentInstance}
                                </ReactBootstrap.Panel>
                            )
                        }
/*
                        if (typeof(this.props.locale[section]) == 'object') {
                            return (
                                <ReactBootstrap.Panel key={section} header={section} eventKey={section} bsStyle="success" >
                                { Object.keys(this.props.locale[section]).map(
                                    (tag) => {
                                        if (typeof(this.props.locale[section][tag]) == 'object') {
                                            return (
                                                <ReactBootstrap.Panel collapsible key={tag} header={tag} eventKey={tag} bsStyle="success" >
                                                    <LocaleComponent
                                                        locale = {this.props.locale[section][tag]}
                                                    />
                                                </ReactBootstrap.Panel>
                                            )
                                        }
                                        else {
                                            return (
                                                <ItemComponent key={tag}
                                                    tag = {tag}
                                                    item = {this.props.locale[section][tag]}
                                                />
                                            )
                                        }
                                    }
                                )}
                                </ReactBootstrap.Panel>
                            );
                        }
                        else {
                            return (
                                <ItemComponent key={section}
                                    tag = {section}
                                    item = {this.props.locale[section]}
                                />
                            )
                        }
*/
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
            <div>
                <h5>{this.props.record.get('en')}</h5>
                <h5>{this.props.record.get('cn')}</h5>
                <h5>{this.props.record.get('ja')}</h5>
                <h5>{this.props.record.get('ru')}</h5>
            </div>
        );
    }
});
/*
<ReactBootstrap.ListGroup>
            {languages.map (
                (lang) => {

                    <ReactBootstrap.ListGroupItem key={this.props.record.get("tag") + lang}>
                        <ReactBootstrap.Grid>
                            <ReactBootstrap.Row className='show-grid'>
                                <ReactBootstrap.Col xs={6} md={6}>
                                    <h5>{lang}</h5>
                                </ReactBootstrap.Col>
                                <ReactBootstrap.Col xs={6} md={6}>
                                    <h5>{this.props.record.get(lang)}</h5>
                                </ReactBootstrap.Col>
                            </ReactBootstrap.Row>
                        </ReactBootstrap.Grid>
                    </ReactBootstrap.ListGroupItem>

                })
                }
</ReactBootstrap.ListGroup>

*/
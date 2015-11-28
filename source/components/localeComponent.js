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

                            return (
                                <ReactBootstrap.Panel key={record.id} header={tag} eventKey={tag} bsStyle="info" >
                                    <LocaleComponent
                                        locale = {this.props.locale}
                                        parent = {record}
                                    />
                                    <ItemComponent
                                        tag = {tag}
                                        item = {record.get("en")}
                                    />
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


var ItemComponent = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <ReactBootstrap.ListGroupItem key={this.props.tag}>
                <ReactBootstrap.Grid>
                    <ReactBootstrap.Row className='show-grid'>
                        <ReactBootstrap.Col xs={6} md={6}>
                            <h5>{this.props.tag}</h5>
                        </ReactBootstrap.Col>
                        <ReactBootstrap.Col xs={6} md={6}>
                            <h5>{this.props.item}</h5>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Grid>
            </ReactBootstrap.ListGroupItem>
        );
    }
});



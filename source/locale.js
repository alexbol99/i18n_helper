
export var LocaleView = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <div>
                <ReactBootstrap.PanelGroup defaultActiveKey="2" accordion>
                    {Object.keys(this.props.locale).map(
                            section =>
                            <ReactBootstrap.Panel key={section} header={section} eventKey={section}>Content</ReactBootstrap.Panel>
                    )}
                </ReactBootstrap.PanelGroup>
            </div>

        );
    }
});

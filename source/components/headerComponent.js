/**
 * Created by Owner on 11/27/15.
 */

export var HeaderComponent = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <div>
                <Title />
                <Menu
                    onImportButtonClick = {this.props.onImportButtonClick}
                    onDownloadButtonClick = {this.props.onDownloadButtonClick}
                />
                <Languages
                    languages = {this.props.languages}
                    onLanguageCheckboxChanged = {this.props.onLanguageCheckboxChanged}
                />
            </div>
        );
    }
});

var Title = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <ReactBootstrap.Jumbotron>
                <h1 style={{marginLeft: '3vw'}}>Translation manager</h1>
            </ReactBootstrap.Jumbotron>
        );
    }
});

var Menu = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <ReactBootstrap.Grid>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col xs={4} md={2}>
                        <ReactBootstrap.Button bsSize="large" onClick={this.props.onImportButtonClick} >
                            <ReactBootstrap.Glyphicon glyph="cloud-upload" />
                            &nbsp;&nbsp;Import
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>

                    <ReactBootstrap.Col xs={4} md={2}>
                        <ReactBootstrap.Button bsSize="large" onClick={this.props.onDownloadButtonClick} >
                            <ReactBootstrap.Glyphicon glyph="cloud-download" />
                        &nbsp;&nbsp;
                            Download
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Grid>
        );
    }
});

var Languages = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <ul className="checkbox-grid">
            {[...this.props.languages.keys()].map( (lang) => {
                var checkBoxInstance = this.props.languages.get(lang) ? (
                    <ReactBootstrap.Input
                        type="checkbox" label={lang} name={lang} checked onChange={this.props.onLanguageCheckboxChanged} />
                ) : (
                    <ReactBootstrap.Input
                        type="checkbox" label={lang} name={lang} onChange={this.props.onLanguageCheckboxChanged} />
                )

                return (
                    <li key={lang}>
                        {checkBoxInstance}
                    </li>
                )
                })
            }

            </ul>
        );
    }
});

/*
<ReactBootstrap.Col xs={4} md={2}>
    <ReactBootstrap.Button bsSize="large">
        <ReactBootstrap.Glyphicon glyph="pencil" />
    &nbsp;&nbsp;Edit
    </ReactBootstrap.Button>
</ReactBootstrap.Col>
*/

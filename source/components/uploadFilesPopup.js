/**
 * Created by Owner on 11/27/15.
 */
export var UploadFilesPopup = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    componentDidMount() {
        var dropbox = document.getElementById("filedrag");
        dropbox.addEventListener("dragenter", this.dragenter, false);
        dropbox.addEventListener("dragover", this.dragover, false);
        dropbox.addEventListener("drop", this.drop, false);
    },
    dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    },
    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    },
    drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;
        var f = files[0];

        this.props.uploadFile(f);
    },
    render() {
        return (
            <div className="static-modal">
                <ReactBootstrap.Modal.Dialog show={this.props.showPopup} onHide={this.props.hidePopup}>
                    <ReactBootstrap.Modal.Header closeButton onHide={this.props.hidePopup}>
                        <ReactBootstrap.Modal.Title>
                            Import Translation Files
                        </ReactBootstrap.Modal.Title>
                    </ReactBootstrap.Modal.Header>

                    <ReactBootstrap.Modal.Body>
                        <ReactBootstrap.Panel >
                            <div id="filedrag"style={{border: 'none'}}>
                                <h2>Drop JSON file here ...</h2>
                                <h2>or</h2>
                                <h2>press Upload button</h2>
                            </div>
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

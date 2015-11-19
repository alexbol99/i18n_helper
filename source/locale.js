
import { Parse } from '../lib/parse-1.6.7.min';

export var LocaleView = React.createClass({
    getInitialState: function() {
        return ({
        });
    },
    render: function() {
        return (
            <div>
                {Object.keys(this.props.locale).map(
                        section =>
                        (<h3 key={section}>{section}</h3>)
                )}
            </div>

        );
    }
});

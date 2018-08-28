import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import jsonp from 'jsonp';

class Demo extends React.Component {
    constructor() {
        super();
        this.state = {words: [], index: -1}
    }

    handleChange = (e) => {
        let wd = e.target.value;
        jsonp(`https://www.baidu.com/su?wd=${wd}`, {param: 'cb'},
            (err, data) => {
                this.setState({words: data.s})
            }
        )
    };

    handleKeyDown = (e) => {
        let code = e.keyCode,
            index = this.state.index;
        if (code === 38) {
            index--;
            if (index === -2) {
                index = this.state.words.length - 1;
            }
            e.target.value = this.state.words[index];
        }
        if (code === 40) {
            index++;
            if (index === this.state.words.length) {
                index = -1;
            }
            e.target.value = this.state.words[index];
        }
        this.setState({index});

        if (code === 13) {
            window.location.href = `https://www.baidu.com/s?wd=${e.target.value}`
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input type="text" className="form-control"
                                       onChange={this.handleChange}
                                       onKeyDown={this.handleKeyDown}
                                />
                            </div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {
                                        this.state.words.map((word, index) => (
                                            <li className={"list-group-item " + (index === this.state.index ? "active" : "")}
                                                key={index}>
                                                {word}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>, document.getElementById('root'));



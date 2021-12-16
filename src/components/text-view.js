import './text-view.css'
import React from 'react';

export class TextView extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.props.setInputedText(e.target.value);
    }

    render() {
        let classTitle = "title";
        if (this.props.textError) {
            classTitle += " error";
        }
        return (
        <div className="textview">
            <span className={classTitle}>Текст:</span>
            <textarea className="textview-input" onChange={this.onChangeHandler}></textarea>
        </div>
        )
    }
}
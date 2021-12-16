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
        let classTitle = "textview-input";
        if (this.props.textError) {
            classTitle += " text-error";
        }
        return (
        <div className="textview">
            <span className="title">Текст:</span>
            <textarea className={classTitle} onChange={this.onChangeHandler} onFocus={this.props.clearTextError}></textarea>
        </div>
        )
    }
}
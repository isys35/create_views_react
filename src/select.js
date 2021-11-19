import React from 'react';
import './select.css';


class SelectItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleSelect(this.props.value, this.props.text);
    }

    render() {
        return (
            <li className={this.props.className} value={this.props.value} onClick={this.handleClick}>{this.props.text}</li>
        )
    }

}

export class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {opened: false, value: this.props.value, text: this.props.text};
        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleClick() {
        if (!this.props.inactive) {
            this.setState({opened: !this.state.opened});
        }

    }

    handleSelect(value, text) {
        if (!this.props.inactive) {
            this.setState({value: value, text: text});
            if (this.props.handleChange) {
                this.props.handleChange(value);
            }
        }
    }

    render() {
        const selectItems = (this.props.items == undefined) ? null : this.props.items.map(
                            (item) => <SelectItem className="select__item" value={item.value} text={item.text} handleSelect={this.handleSelect}/>
                        );
        return (
            <div className={(this.props.inactive) ? "select inactive" : "select"} onClick={this.handleClick}>
                <input className="select__input" type="hidden"/>
                <div className={(this.state.opened === false) ? 'select__head' : 'select__head open'}>
                    { (this.state.text == null) ? 'Выберите' : this.state.text }
                </div>
                <ul className={(this.state.opened === false) ? 'select__list' : 'select__list open'}>
                    {
                        selectItems
                    }
                </ul>
            </div>
        )
    }

}
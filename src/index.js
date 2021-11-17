import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Select } from './select.js';
import { Load } from './load.js';
import { CommandTrigger } from './commands';
import { HOST } from './settings';
import { SaveButton } from './action-buttons'


const executionConditions = [
    {text:"команда", value:'command-trigger'},
    {text:"представление", value:'view-trigger'},
]


function Trigger(props) {
    const trigger = props.trigger
    const component = (trigger === 'command-trigger') ? <CommandTrigger /> : <ViewTrigger />
    return component
}



function TextView(props) {
    return (
        <div>
            <textarea className="textview-input"></textarea>
        </div>
    )
}





function ViewTrigger(props) {
    return (<div>
                <div className="row-select">
                    <span className="title">Представление:</span>
                </div>
            </div>
    )
}

class AddButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="tgbutton addbutton" onClick={this.props.setStatusCreate}>Добавить кнопку</div>)
    }
}


class Button extends  React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                    <button className="tgbutton" disabled="disabled">{this.props.btnText}</button>
                </div>)
    }

}

class  ButtonFieldView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let buttons = this.props.buttons.map((button) => <Button btnText={button}/>);
        return (<div>
                    {buttons}
                </div>)
    }

}


class ButtonField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'add', buttons: []};
        this.setStatusCreate = this.setStatusCreate.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
        this.addButton = this.addButton.bind(this);

    }

    setStatusCreate() {
        this.setState({status: 'create'});
    }

    addButton(text) {
        this.setState({
            buttons: [...this.state.buttons, text]
        });
    }

    cancelCreate() {
        this.setState({status: 'add'});
    }

    render() {
        if (this.state.status == 'add') {
            return  <div>
                        <ButtonFieldView buttons={this.state.buttons} />
                        <AddButton setStatusCreate={this.setStatusCreate} />
                    </div>
        } else {
            return <div>
                        <ButtonFieldView buttons={this.state.buttons} />
                        <ButtonCreater cancelCreate={this.cancelCreate} addButton={this.addButton}/>
                    </div>

        };
    }
}


class ButtonCreater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', type: 'ReplyKeyboard', mode: 'create'};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.setSelectMode = this.setSelectMode.bind(this);
        this.setCreateMode = this.setCreateMode.bind(this);
    }
    
    
    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleChangeType(event) {
        this.setState({type: event.target.value});
    }

    setSelectMode() {
        this.setState({mode: 'select'});
    }

    setCreateMode() {
        this.setState({mode: 'create'});
    }


    saveButton() {
        const url = (this.props.typeButtons === 'ReplyKeyboard') ? `${HOST}replybuttons` :  `${HOST}inlinebuttons`;
         fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    value: this.state.text
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(async res => {
                let result = await res.json();
                if (!res.ok) {
                    console.log(result.detail);
                } else {
                    this.props.addButton(this.state.text);
                    this.props.cancelCreate();
                }
            })
    }


    render() {
        const inputBlock = (this.state.mode === 'create') ? <input onChange={this.handleChange} type="text" value={this.state.text}/> : <button></button>
        const changeModeBlock = (this.state.mode === 'create') ? <button onClick={this.setSelectMode}>🔎</button> : <button onClick={this.setCreateMode}>✏️</button>
        return (
            <div className="button-creator">
                <Button btnText={this.state.text}/>
                {inputBlock}
                <button onClick={this.saveButton}>💾</button>
                <button onClick={this.props.cancelCreate}>❌</button>
                {changeModeBlock}
            </div>
    )
    }

}


class ButtonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {typeButtons: 'ReplyKeyboard'}
    }

    render() {
        const button_types = [
            {value: 'ReplyKeyboard', text:'ReplyKeyboard'},
            {value: 'InlineKeyboard', text:'InlineKeyboard'}
        ];
        
        return (
            <div>
                <div className="row-select">
                    <span className="title">Тип кнопок: </span>
                    <Select items={button_types} text={button_types[0].text} value={button_types[0].value}/>
                </div>
                <div>
                    <ButtonField typeButtons={this.state.typeButtons} />
                </div>
            </div>
    )
    }
}





class CreateViewMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {trigger: executionConditions[0].value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({trigger: value});
    }

    render() {
        const executionConditions = this.props.executionConditions;
        const options = executionConditions.map((executionCondition) =>
            <option
                key={executionCondition.text}
                value={executionCondition.value}>
                    {executionCondition.text}
            </option>);
        return (

            <div className="container">
                <h1>Cоздание шага</h1>
                <div className="create-view">
                    <div className="row-select">
                        <span className="title">Условие выполнения:</span>
                        <Select items={executionConditions}
                                text={executionConditions[0].text}
                                value={executionConditions[0].value}
                                handleChange={this.handleChange}
                        />
                    </div>
                    <Trigger trigger={this.state.trigger}/>
                    <TextView />
                    <ButtonView />
                    <div className="row-save-button">
                        <SaveButton />
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
